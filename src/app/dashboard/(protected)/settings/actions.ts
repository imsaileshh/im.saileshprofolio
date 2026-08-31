'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { verifySession } from '@/lib/auth/session';

export async function updateSettingsAction(formData: FormData) {
  const session = await verifySession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  const isHiringOpen = formData.get('isHiringOpen') === 'on';
  const availabilityMsg = formData.get('availabilityMsg') as string || null;
  const maintenanceMode = formData.get('maintenanceMode') === 'on';
  const analyticsEnabled = formData.get('analyticsEnabled') === 'on';
  const sessionTimeoutMinutes = parseInt(formData.get('sessionTimeoutMinutes') as string) || 5;

  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {
      isHiringOpen,
      availabilityMsg,
      maintenanceMode,
      analyticsEnabled,
      sessionTimeoutMinutes,
    },
    create: {
      id: 'singleton',
      isHiringOpen,
      availabilityMsg,
      maintenanceMode,
      analyticsEnabled,
      sessionTimeoutMinutes,
    }
  });

  revalidatePath('/dashboard/settings');
  revalidatePath('/'); // Revalidate public pages since settings like hiring status might show there
}

export async function updateHomeContentAction(formData: FormData) {
  const session = await verifySession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  // Parse Hero Content
  const heroContent = {
    eyebrowPrefix: formData.get('hero_eyebrowPrefix') as string || '',
    eyebrowRoles: formData.get('hero_eyebrowRoles') as string || '',
    headingLine1: formData.get('hero_headingLine1') as string || '',
    headingLine2: formData.get('hero_headingLine2') as string || '',
    paragraph1: formData.get('hero_paragraph1') as string || '',
    paragraph2: formData.get('hero_paragraph2') as string || '',
    primaryBtnText: formData.get('hero_primaryBtnText') as string || '',
    primaryBtnLink: formData.get('hero_primaryBtnLink') as string || '',
    secondaryBtnText: formData.get('hero_secondaryBtnText') as string || '',
    secondaryBtnLink: formData.get('hero_secondaryBtnLink') as string || '',
  };

  // Parse About Content
  const aboutContent = {
    eyebrow: formData.get('about_eyebrow') as string || '',
    heading: formData.get('about_heading') as string || '',
    role: formData.get('about_role') as string || '',
    paragraph: formData.get('about_paragraph') as string || '',
    ctaText: formData.get('about_ctaText') as string || '',
    ctaLink: formData.get('about_ctaLink') as string || '',
    capabilities: [
      {
        title: formData.get('about_cap1_title') as string || '',
        desc: formData.get('about_cap1_desc') as string || '',
      },
      {
        title: formData.get('about_cap2_title') as string || '',
        desc: formData.get('about_cap2_desc') as string || '',
      },
      {
        title: formData.get('about_cap3_title') as string || '',
        desc: formData.get('about_cap3_desc') as string || '',
      },
      {
        title: formData.get('about_cap4_title') as string || '',
        desc: formData.get('about_cap4_desc') as string || '',
      }
    ]
  };

  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {
      heroContent,
      aboutContent,
    },
    create: {
      id: 'singleton',
      heroContent,
      aboutContent,
    }
  });

  revalidatePath('/dashboard/settings');
  revalidatePath('/'); 
}
