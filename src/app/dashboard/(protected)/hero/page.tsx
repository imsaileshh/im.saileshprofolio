import { prisma } from '@/lib/database/prisma';
import { updateHeroAction } from './actions';
import { ConfirmSubmitButton } from '@/components/dashboard/ConfirmSubmitButton';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HeroEditorPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'singleton' }
  });

  const content = (settings?.heroContent as any) || {
    eyebrow: 'UI/UX DESIGNER',
    heading1: "Hey, I'm",
    heading2: "Sailesh.",
    description1: "I'm a UI/UX designer and frontend developer based in Kerala, India.",
    description2: "I craft digital experiences that balance aesthetic precision with robust engineering.",
    primaryCtaText: "View Projects",
    primaryCtaLink: "/projects",
    secondaryCtaText: "Hire Me",
    secondaryCtaLink: "/hire-me",
    profileLabels: "AVAILABLE FOR WORK · BASED IN KERALA",
    supportingText: "Passionate about creating intuitive, engaging, and accessible user experiences."
  };

  const inputClass = "w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-[#4F8CFF]";

  return (
    <main className="space-y-8 max-w-4xl mx-auto pb-12">
      <header className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} className="text-zinc-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Hero Section</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage the content for your portfolio's public homepage hero.</p>
        </div>
      </header>

      <form action={updateHeroAction} className="space-y-6">
        <section className="rounded-xl border border-white/10 bg-[#111113] p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-4">Typography & Introduction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-400">Eyebrow (Small top text)</span>
              <input name="eyebrow" defaultValue={content.eyebrow} className={inputClass} />
            </label>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="mb-1.5 block text-sm text-zinc-400">Heading Line 1</span>
                <input name="heading1" defaultValue={content.heading1} className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-zinc-400">Heading Line 2</span>
                <input name="heading2" defaultValue={content.heading2} className={inputClass} />
              </label>
            </div>
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-sm text-zinc-400">Description Paragraph 1</span>
              <textarea name="description1" defaultValue={content.description1} className={`${inputClass} min-h-24`} />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-sm text-zinc-400">Description Paragraph 2</span>
              <textarea name="description2" defaultValue={content.description2} className={`${inputClass} min-h-24`} />
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-[#111113] p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-4">Call to Actions (Buttons)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-400">Primary Button Text</span>
              <input name="primaryCtaText" defaultValue={content.primaryCtaText} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-400">Primary Button Link</span>
              <input name="primaryCtaLink" defaultValue={content.primaryCtaLink} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-400">Secondary Button Text</span>
              <input name="secondaryCtaText" defaultValue={content.secondaryCtaText} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-400">Secondary Button Link</span>
              <input name="secondaryCtaLink" defaultValue={content.secondaryCtaLink} className={inputClass} />
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-[#111113] p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-4">Image Side Content</h2>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-400">Profile Labels (Small text next to image)</span>
              <input name="profileLabels" defaultValue={content.profileLabels} className={inputClass} placeholder="AVAILABLE FOR WORK · BASED IN KERALA" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-400">Supporting Text (Below image)</span>
              <textarea name="supportingText" defaultValue={content.supportingText} className={`${inputClass} min-h-20`} />
            </label>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <ConfirmSubmitButton message="Save Hero Content?" className="h-10 rounded-lg bg-[#4F8CFF] px-8 text-sm font-semibold text-white hover:bg-[#3B78EB]">
            Save Changes
          </ConfirmSubmitButton>
        </div>
      </form>
    </main>
  );
}
