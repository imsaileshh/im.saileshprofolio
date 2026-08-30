'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function EditorialContact() {
  return (
    <section id="contact" className="py-24 md:py-40 bg-foreground text-card my-12 rounded-3xl mx-4 md:mx-0 overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      <div className="px-8 md:px-16 flex flex-col items-center text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-secondary font-medium tracking-widest uppercase text-sm mb-6"
        >
          Have a project in mind?
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-12 max-w-4xl"
        >
          Let's create something <br className="hidden md:block" /> worth remembering.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link 
            href="mailto:hello@sailesh.com"
            className="group flex items-center justify-center gap-3 bg-card text-foreground px-10 py-5 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300"
          >
            Start a Conversation 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-45 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
