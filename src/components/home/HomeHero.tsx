'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const rotatingRoles = ['SHOPIFY DEVELOPER', 'VIBE CODER', 'E-COMMERCE'];
const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true); // default to true to prevent hydration mismatch on parallax

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const textX = useTransform(smoothMouseX, [-1, 1], [-3, 3]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-3, 3]);

  const imageX = useTransform(smoothMouseX, [-1, 1], [5, -5]);
  const imageY = useTransform(smoothMouseY, [-1, 1], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Scroll exit setup
  const { scrollYProgress } = useScroll();
  const textScrollY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const imageScrollY = useTransform(scrollYProgress, [0, 0.2], [0, 40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);

  return (
    <motion.section 
      id="home"
      style={{ opacity: heroOpacity }}
      onMouseMove={handleMouseMove}
      className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-between pt-7 pb-9 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16 min-h-auto lg:min-h-[82vh]"
    >
      {/* LEFT: TEXT CONTENT */}
      <motion.div 
        style={!isMobile ? { x: textX, y: textY, translateY: textScrollY } : {}}
        className="flex-1 w-full max-w-[640px] mt-2 lg:mt-0 relative z-10 flex flex-col justify-center"
      >
        {/* Role Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 mb-5"
        >
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
          />
          <div className="text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-[0.06em] flex items-center overflow-hidden">
            <span>UI/UX DESIGNER · FRONTEND DEVELOPER ·&nbsp;</span>
            <div className="relative h-[1.2em] w-[140px] sm:w-[160px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 text-foreground"
                >
                  {rotatingRoles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        
        {/* Headline */}
        <h1 className="font-display font-medium tracking-tight mb-5">
          <motion.div 
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.15, ease }}
            className="block text-[clamp(40px,11vw,68px)] lg:text-[clamp(56px,6vw,92px)] leading-[0.98] mb-1"
          >
            Hey, I'm
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.23, ease }}
            className="block text-[clamp(48px,13vw,76px)] lg:text-[clamp(64px,7vw,104px)] leading-[0.98] text-accent"
          >
            Sailesh.
          </motion.div>
        </h1>
        
        {/* Supporting Text */}
        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease }}
          className="text-base md:text-[19px] text-muted leading-[1.58] font-light mb-8 max-w-[580px]"
        >
          I design and build modern digital experiences — from intuitive interfaces and <HoverWord>Shopify</HoverWord> storefronts to scalable web products.
          <br className="hidden md:block" />
          <br className="hidden md:block" />
          Blending <HoverWord>UI/UX</HoverWord>, <HoverWord>Frontend</HoverWord> development, e-commerce and <HoverWord>AI</HoverWord>-assisted workflows.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col min-[440px]:flex-row items-stretch min-[440px]:items-center w-full min-[440px]:w-auto gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease }}
            className="w-full min-[440px]:w-auto"
          >
            <Link 
              href="/projects" 
              className="group relative flex items-center justify-center gap-2 bg-foreground text-[var(--bg)] px-6 py-3.5 rounded-xl text-[15px] font-semibold hover:brightness-95 hover:-translate-y-[2px] hover:scale-[1.015] active:scale-[0.98] transition-all duration-[220ms] overflow-hidden w-full"
            >
              <span className="relative z-10">View Projects</span>
              <ArrowUpRight size={18} className="relative z-10 transition-transform duration-[220ms] group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-[220ms] ease-out" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.53, ease }}
            className="w-full min-[440px]:w-auto"
          >
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-hire-me'))}
              className="group flex items-center justify-center gap-2 bg-transparent text-foreground px-6 py-3.5 rounded-xl text-[15px] font-semibold border border-border-subtle hover:bg-border-subtle/20 active:scale-[0.98] transition-all duration-200 w-full"
            >
              <span className="transition-transform duration-[220ms] group-hover:translate-x-1">Let's Talk</span>
              <ArrowRight size={18} className="transition-transform duration-[220ms] group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT: PORTRAIT */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.1, ease }}
        style={!isMobile ? { x: imageX, y: imageY, translateY: imageScrollY } : {}}
        className="w-[78%] max-w-[270px] mx-auto sm:w-[300px] md:w-[320px] lg:w-[340px] lg:mx-0 shrink-0 relative z-10 group mt-4 lg:mt-0"
      >
        <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden border border-border-subtle bg-[var(--card)] transition-transform duration-400 group-hover:-translate-y-1 group-hover:border-white/15">
          <Image
            src="/images/profile/IMG_0871.jpg"
            alt="Sailesh P"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 350px"
            className="object-cover grayscale-[0.15] transition-all duration-400 group-hover:grayscale-0 group-hover:scale-[1.025]"
          />
          {/* Subtle Graphic Overlay */}
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
            <span className="text-[10px] font-mono opacity-30 text-white">01</span>
            <span className="text-[10px] font-mono opacity-30 text-white self-end">SAILESH P / 2026</span>
          </div>
          {/* Extremely Subtle Radial Gradient Behind Portrait (applied to wrapper in next div) */}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex justify-between items-center mt-4 px-1 group-hover:tracking-wide transition-all duration-400"
        >
          <span className="text-[9px] font-mono tracking-widest uppercase text-muted font-semibold">SAILESH P</span>
          <span className="text-[9px] font-mono tracking-widest uppercase text-muted">PROFILE</span>
        </motion.div>
        <div className="mt-1 px-1">
          <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted/60">DESIGN · CODE · COMMERCE</span>
        </div>

        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full -z-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.05), transparent 55%)' }} />
      </motion.div>
      
      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle transform origin-left" style={{ animation: 'scaleX 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards' }} />

      {/* SCROLL INDICATOR */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        className="absolute bottom-8 right-6 lg:right-20 flex flex-col items-center gap-2 hidden md:flex pointer-events-none"
      >
        <span className="text-[9px] font-mono tracking-widest text-muted/50 uppercase origin-bottom -rotate-90 translate-y-[-10px]">SCROLL</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-muted/50 to-transparent"
        />
      </motion.div>
    </motion.section>
  );
}

// Interactive Subtext Keyword component
function HoverWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-foreground group cursor-default transition-transform duration-300 hover:-translate-y-px hover:text-accent font-medium">
      {children}
      <span className="absolute left-0 bottom-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </span>
  );
}
