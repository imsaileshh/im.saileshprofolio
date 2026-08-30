'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '@/data/navigation';

const mainNavItems = [
  ...navigation.map(item => ({
    id: item.label.toLowerCase(),
    icon: item.icon,
    label: item.label === 'Experience' ? 'Exp.' : item.label,
    ariaLabel: item.label,
    href: item.href,
  })),
  { id: 'resume', icon: FileText, label: 'Resume', ariaLabel: 'Resume', href: '#' },
];

interface MobileBottomNavProps {
  onOpenResume: () => void;
  onOpenHireMe?: () => void;
}

export function MobileBottomNav({ onOpenResume }: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <div 
      className="md:hidden fixed z-[100] bottom-3 left-3 right-3 min-h-[66px] bg-[var(--panel)] border border-border-subtle rounded-[14px] shadow-[0_18px_50px_rgba(0,0,0,0.20)] flex items-center justify-center backdrop-blur-[14px] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="w-full max-w-[400px] h-full grid grid-cols-6 items-center px-1">
        {mainNavItems.map((item) => {
          let isActive = false;
          if (item.id !== 'resume') {
            isActive = item.href === '/' 
              ? pathname === '/' 
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          }

          const content = (
            <>
              {isActive && (
                <motion.div
                  layoutId="mobile-active-nav"
                  className="absolute inset-0 bg-nav-active rounded-[10px]"
                  transition={{ duration: 0.24, ease: "easeOut" }}
                />
              )}
              
              <span
                data-mobile-nav-label
                className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[8px] border border-border-subtle bg-foreground px-2 py-1 text-[10px] font-medium text-[var(--bg)] opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-active:translate-y-0 group-active:opacity-100"
              >
                {item.ariaLabel}
              </span>

              <div className="relative z-10 flex items-center justify-center">
                <motion.div
                  animate={{ y: 0, scale: isActive ? 1.08 : 1 }}
                  transition={{ duration: 0.24 }}
                >
                  <item.icon 
                    size={22} 
                    className={isActive ? 'text-foreground' : 'text-muted'} 
                  />
                </motion.div>
              </div>
            </>
          );

          if (item.id === 'resume') {
            return (
              <motion.button
                key={item.id}
                onClick={onOpenResume}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.16 }}
                className="group relative flex flex-col items-center justify-center h-[54px] w-full rounded-[10px] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={item.ariaLabel}
                type="button"
              >
                {content}
              </motion.button>
            );
          }
            
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex flex-col items-center justify-center h-[54px] w-full rounded-[10px] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.93]"
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
