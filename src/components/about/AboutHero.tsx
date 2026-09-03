'use client';

import Image from 'next/image';
import { SectionReveal } from '@/components/ui/SectionReveal';

export function AboutHero({ data }: { data?: any }) {
  const intro = data || {
    eyebrow: 'ABOUT / 01',
    heading1: 'Designing.',
    heading2: 'Building.',
    heading3: 'Improving digital experiences.',
    role: 'UI/UX Designer • Frontend Developer • Vibe Coder',
    paragraph: (
      <>
        <p className="mb-4">
          I&apos;m a UI/UX Designer and Frontend Developer passionate about creating intuitive digital experiences, interactive interfaces, and modern web applications that look great, feel seamless, and perform well.
        </p>
        <p>
          When I&apos;m not designing or building, I&apos;m exploring new technologies, experimenting with AI-powered development, and refining user experiences. My work blends creative design with frontend development — clean interfaces, smooth interactions, and experiences that feel alive.
        </p>
      </>
    )
  };

  return (
    <SectionReveal className="pt-6 md:pt-8 pb-10 md:pb-12 relative">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 items-start">
        
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase mb-5">
            {intro.eyebrow}
          </h2>
          
          <h1 className="text-3xl md:text-4xl lg:text-[3rem] font-display font-medium leading-[1.1] tracking-tight mb-6">
            <span className="block mb-2">{intro.heading1}</span>
            <span className="block mb-2">{intro.heading2}</span>
            <span className="block text-accent">{intro.heading3}</span>
          </h1>
          
          <div className="flex flex-col gap-4 max-w-xl">
            <p className="text-lg md:text-xl text-foreground leading-[1.6] font-medium">
              {intro.role}
            </p>
            <div className="text-[15px] md:text-[16px] text-muted leading-[1.7] font-light">
              {intro.paragraph}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Premium Profile Frame) */}
        <div className="flex flex-col gap-4 lg:w-[320px] shrink-0 mx-auto lg:mx-0 w-full max-w-[340px]">
          <div className="group relative w-full aspect-[4/5] rounded-[18px] border border-border-subtle bg-[var(--sidebar)] overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-[0_10px_40px_rgba(var(--accent-rgb),0.08)] cursor-default">
            <Image 
              src="/images/profile/IMG_0871.jpg"
              alt="Sailesh P"
              fill
              className="object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
              priority
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.1em] text-muted uppercase px-2">
            <span>SAILESH P</span>
            <span>UI/UX + FRONTEND</span>
            <span>2026</span>
          </div>
        </div>

      </div>
    </SectionReveal>
  );
}
