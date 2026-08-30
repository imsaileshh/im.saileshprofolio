'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    year: '2025 — PRESENT',
    role: 'Frontend Architect',
    company: 'Xeltr',
    description: 'Leading frontend architecture for enterprise scalable dashboards. Establishing design systems and automated CI/CD pipelines for optimal performance.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    year: '2023 — 2025',
    role: 'UI/UX Engineer',
    company: 'Kroma Studio',
    description: 'Bridged the gap between design and development. Built interactive 3D web experiences and component libraries used across 12+ projects.',
    technologies: ['React', 'Three.js', 'WebGL', 'Figma', 'Storybook'],
  },
  {
    year: '2022 — 2023',
    role: 'Full Stack Developer',
    company: 'Aether Vault',
    description: 'Developed secure cryptographic ledgers and real-time dashboard telemetry engines with high frequency updates.',
    technologies: ['Node.js', 'PostgreSQL', 'WebSockets', 'Redis', 'Docker'],
  }
];

export function EditorialExperience() {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-border-subtle">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-16"
      >
        Experience
      </motion.h2>

      <div className="flex flex-col">
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col md:flex-row gap-8 md:gap-16 py-12 border-b border-border-subtle group hover:bg-secondary/5 transition-colors duration-500 -mx-6 px-6"
          >
            <div className="w-full md:w-1/4 shrink-0">
              <span className="text-sm font-medium text-secondary tracking-widest font-mono">
                {exp.year}
              </span>
            </div>
            
            <div className="w-full md:w-3/4 flex flex-col items-start">
              <h3 className="text-2xl font-display font-medium text-foreground mb-2 group-hover:text-black transition-colors">
                {exp.role}
              </h3>
              <p className="text-lg text-secondary mb-6">{exp.company}</p>
              
              <p className="text-secondary leading-relaxed mb-6 max-w-2xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full border border-border-subtle text-secondary bg-card">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
