'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  'UI/UX Design',
  'Frontend Development',
  'Product Development',
  'Design Systems',
];

export function EditorialAbout() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left: Portrait */}
        <div className="w-full md:w-5/12">
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/10">
            <Image
              src="/images/profile-placeholder.jpg" // adjust path
              alt="Sailesh P"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Right: Intro & Bio */}
        <div className="w-full md:w-7/12 flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-8"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 text-lg text-secondary leading-relaxed"
          >
            <p className="text-2xl md:text-3xl font-medium text-foreground leading-snug mb-8">
              "I'm a developer and designer focused on building thoughtful, scalable digital products."
            </p>
            <p>
              My work bridges the gap between design and engineering. I believe the best products are built when visual aesthetics and technical architecture are considered simultaneously.
            </p>
            <p>
              With experience spanning across interactive portfolios, complex dashboards, and scalable web applications, I bring a holistic approach to product development. I focus on fine-tuning micro-interactions while ensuring robust backend data systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <h3 className="text-sm font-medium tracking-widest uppercase text-foreground mb-6">What I Do</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, idx) => (
                <li key={idx} className="flex items-center gap-3 text-secondary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/20"></span>
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
