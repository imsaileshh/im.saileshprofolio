'use client';

import { Mail } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { HireMeCTAButton } from '@/components/hire/HireMeCTAButton';

export function ContactCTASection() {
  return (
    <SectionReveal id="contact-cta" className="pt-10 md:pt-14 lg:pt-16 pb-14 md:pb-16 px-5 sm:px-6 md:px-10 lg:px-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <SectionHeader icon={Mail} label="CONTACT" className="!mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-display font-medium tracking-tight mb-2">
            Let's work together
          </h2>
          <p className="text-muted text-base md:text-lg max-w-xl">
            Have a project, collaboration or idea in mind? Send me a message.
          </p>
        </SectionHeader>
        <HireMeCTAButton />
      </div>
    </SectionReveal>
  );
}
