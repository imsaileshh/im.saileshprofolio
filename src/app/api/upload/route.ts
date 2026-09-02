import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.authorized) return auth.response;

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|svg|pdf)$/i)) {
      return NextResponse.json({ error: 'Unsupported file type. Allowed: JPG, PNG, WEBP, SVG, PDF' }, { status: 400 });
    }

    // 20MB limit
    const MAX_FILE_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File is too large. Maximum size is 20MB.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    // Use service role key to bypass RLS for admin uploads
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials missing');
      return NextResponse.json({ error: 'Storage configuration missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const hash = crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-');
    const fileName = `${Date.now()}-${hash}-${safeName}`;
    
    const { error: uploadError } = await supabase
      .storage
      .from('uploads')
      .upload(fileName, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload to storage' }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName);
    const url = publicUrl;

    let type = 'image';
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      type = 'pdf';
    } else if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
      type = 'svg';
    }

    return NextResponse.json({
      success: true,
      url,
      type
    });

  } catch (error) {
    console.error('File upload failed:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
