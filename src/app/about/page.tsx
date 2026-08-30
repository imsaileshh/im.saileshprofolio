import { AboutHero } from '@/components/about/AboutHero';
import { AboutApproach } from '@/components/about/AboutApproach';
import { AboutCapabilities } from '@/components/about/AboutCapabilities';
import { AboutBento } from '@/components/about/AboutBento';
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy';
import { AboutValues } from '@/components/about/AboutValues';

export default function AboutPage() {
  return (
    <div className="flex flex-col p-5 sm:p-6 md:p-10 lg:p-14 pb-10 max-w-6xl mx-auto w-full">
      <AboutHero />
      <AboutApproach />
      <AboutCapabilities />
      <AboutBento />
      <AboutPhilosophy />
      <AboutValues />
    </div>
  );
}
