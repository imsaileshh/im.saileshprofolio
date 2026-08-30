'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProjectTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  
  const tabs = [
    { name: 'Overview', href: `/dashboard/projects/${projectId}/edit` },
    { name: 'Case Study', href: `/dashboard/projects/${projectId}/case-study` },
  ];

  return (
    <div className="flex items-center gap-6 border-b border-white/10 mt-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              isActive 
                ? 'border-[#4F8CFF] text-[#4F8CFF]' 
                : 'border-transparent text-zinc-400 hover:text-white hover:border-white/30'
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
