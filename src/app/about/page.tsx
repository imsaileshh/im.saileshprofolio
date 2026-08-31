import { prisma } from '@/lib/database/prisma';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutApproach } from '@/components/about/AboutApproach';
import { AboutCapabilities } from '@/components/about/AboutCapabilities';
import { AboutBento } from '@/components/about/AboutBento';
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy';
import { AboutValues } from '@/components/about/AboutValues';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'singleton' }
  });

  return (
    <div className="flex flex-col p-5 sm:p-6 md:p-10 lg:p-14 pb-10 max-w-6xl mx-auto w-full">
      <AboutHero data={settings?.aboutPageIntro} />
      <AboutApproach data={settings?.aboutApproach} />
      <AboutCapabilities data={settings?.aboutBring} />
      <AboutBento data={settings?.aboutEnjoy} />
      <AboutPhilosophy data={settings?.aboutPhilosophy} />
      <AboutValues data={settings?.aboutValues} />
    </div>
  );
}
