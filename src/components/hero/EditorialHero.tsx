'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function EditorialHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-24 md:pt-32">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-center">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-secondary font-medium tracking-wide text-sm md:text-base mb-6">
              Hello, I'm Sailesh P.
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight font-medium text-foreground">
              I design and build <br />
              <span className="text-secondary/80">digital experiences</span> <br />
              that feel effortless.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-secondary text-lg md:text-xl max-w-xl leading-relaxed"
          >
            UI/UX Designer and Frontend Developer focused on thoughtful interfaces, scalable frontend systems, and useful digital products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link
              href="#work"
              className="bg-foreground text-card px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300"
            >
              View My Work
            </Link>
            <Link
              href="/about"
              className="border border-border-subtle text-foreground px-8 py-4 rounded-full font-medium hover:bg-border-subtle/30 transition-colors duration-300"
            >
              About Me
            </Link>
          </motion.div>
        </div>

        {/* Right Subtle Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-48 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden shrink-0 hidden sm:block grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
        >
          {/* Optional fallback if image doesn't exist */}
          <div className="absolute inset-0 bg-secondary/10 z-0"></div>
          {/* Use standard image if user has uploaded one to public folder, otherwise a placeholder */}
          <Image
            src="/images/profile-placeholder.jpg" // User should place their image here, or adjust path
            alt="Sailesh P"
            fill
            className="object-cover z-10 opacity-0 transition-opacity duration-300"
            onLoadingComplete={(img) => img.classList.remove('opacity-0')}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
