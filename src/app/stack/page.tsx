import { StackHero } from '@/components/stack/StackHero';
import { StackNav } from '@/components/stack/StackNav';
import { FrontendGrid } from '@/components/stack/FrontendGrid';
import { BackendFlow } from '@/components/stack/BackendFlow';
import { DatabaseBlocks } from '@/components/stack/DatabaseBlocks';
import { ToolsWorkflow } from '@/components/stack/ToolsWorkflow';
import { SoftwareEditorial } from '@/components/stack/SoftwareEditorial';
import { TechMarquee } from '@/components/stack/TechMarquee';

export default function StackPage() {
  return (
    <div className="flex flex-col p-5 sm:p-6 md:p-10 lg:p-14 pb-24 max-w-7xl mx-auto w-full relative">
      <StackHero />
      <StackNav />
      
      {/* Sections */}
      <FrontendGrid />
      <BackendFlow />
      <DatabaseBlocks />
      
      <TechMarquee />
      
      <ToolsWorkflow />
      <SoftwareEditorial />
    </div>
  );
}
