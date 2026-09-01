import { AdvancedCaseStudyEditor } from '@/components/dashboard/case-studies/AdvancedCaseStudyEditor';

export const metadata = {
  title: 'New Case Study | CMS Dashboard',
};

export default function NewCaseStudyPage() {
  return (
    <div className="-m-6 md:-m-10">
      <AdvancedCaseStudyEditor isNew={true} />
    </div>
  );
}
