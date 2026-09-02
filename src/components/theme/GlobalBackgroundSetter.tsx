'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function GlobalBackgroundSetter({ themeConfig }: { themeConfig: any }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!themeConfig) return;

    let targetBg = '';

    // Dashboard routes don't use these backgrounds
    if (pathname.startsWith('/dashboard')) return;

    if (pathname === '/') {
      targetBg = themeConfig.homeBackground;
    } else if (pathname === '/works') {
      targetBg = themeConfig.worksBackground;
    } else if (pathname.startsWith('/works/')) {
      targetBg = themeConfig.workDetailBackground;
    } else if (pathname === '/personal-projects') {
      targetBg = themeConfig.personalProjectsBackground;
    } else if (pathname.startsWith('/personal-projects/')) {
      targetBg = themeConfig.personalProjectDetailBackground;
    } else if (pathname === '/case-studies') {
      targetBg = themeConfig.caseStudiesBackground;
    } else if (pathname.startsWith('/case-studies/')) {
      targetBg = themeConfig.caseStudyDetailBackground;
    } else if (pathname === '/about') {
      targetBg = themeConfig.aboutBackground;
    } else if (pathname === '/stack') {
      targetBg = themeConfig.stackBackground;
    } else if (pathname === '/experience') {
      targetBg = themeConfig.experienceBackground;
    } else if (pathname === '/hire-me') {
      targetBg = themeConfig.hireMeBackground;
    } else if (pathname === '/resume') {
      targetBg = themeConfig.resumeBackground;
    }

    if (targetBg) {
      document.documentElement.style.setProperty('--bg', targetBg);
      // We apply it directly to body as well to ensure it takes precedence
      document.body.style.backgroundColor = targetBg;
    } else {
      // Remove inline styles to fall back to the default CSS variable from globals.css
      document.documentElement.style.removeProperty('--bg');
      document.body.style.backgroundColor = '';
    }

    return () => {
      document.documentElement.style.removeProperty('--bg');
      document.body.style.backgroundColor = '';
    };
  }, [pathname, themeConfig]);

  return null;
}
