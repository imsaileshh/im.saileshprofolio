import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { analyzeCaseStudyPdf } from '@/lib/ai/gemini';

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (!auth.authorized) return auth.response;

    const formData = await request.formData();
    const file = formData.get('pdf') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    // 20MB limit for Gemini API inline data
    const MAX_FILE_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'PDF file is too large. Maximum size is 20MB.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save the original PDF
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    
    const hash = crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-');
    const fileName = `${Date.now()}-${hash}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);
    const pdfUrl = `/uploads/${fileName}`;
    
    await writeFile(filePath, buffer);

    let parsedTitle = file.name.replace('.pdf', '');
    let geminiResponse: any = null;
    let errorMessage = "Couldn't automatically understand this PDF structure.";

    try {
      // Send the raw PDF buffer to Gemini for structural analysis
      geminiResponse = await analyzeCaseStudyPdf(buffer);
      if (geminiResponse?.title) {
        parsedTitle = geminiResponse.title;
      }
    } catch (parseError: any) {
      console.warn('Gemini PDF structural parsing failed:', parseError?.message);
      errorMessage = parseError?.message || errorMessage;
    }

    // If parsing failed or we got bad data, return a graceful fallback 
    // and let the frontend show the fallback card.
    if (!geminiResponse || !geminiResponse.sections) {
      return NextResponse.json({
        success: false,
        error: errorMessage,
        data: {
          pdfUrl,
          title: parsedTitle
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        pdfUrl,
        title: parsedTitle,
        subtitle: geminiResponse.subtitle,
        description: geminiResponse.description,
        theme: geminiResponse.theme,
        typography: geminiResponse.typography,
        hero: geminiResponse.hero,
        navigation: geminiResponse.navigation,
        sections: geminiResponse.sections,
      }
    });

  } catch (error) {
    console.error('PDF conversion failed:', error);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}
