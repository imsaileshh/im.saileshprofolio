'use client';

import { motion } from 'framer-motion';

const stackCategories = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'GraphQL', 'Redis'],
  },
  {
    title: 'Design',
    items: ['Figma', 'Prototyping', 'Design Systems', 'Wireframing', 'WCAG Accessibility'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Docker', 'Vercel', 'AWS', 'Jest', 'Storybook'],
  }
];

export function EditorialStack() {
  return (
    <section id="stack" className="py-24 md:py-32">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-16"
      >
        Tools & Technologies
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {stackCategories.map((category, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col group"
          >
            <h3 className="text-sm font-medium tracking-widest uppercase text-secondary mb-6 border-b border-border-subtle pb-4">
              {category.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {category.items.map((item, i) => (
                <li 
                  key={i} 
                  className="text-lg font-medium text-foreground hover:text-black transition-colors duration-300 flex items-center gap-3 transform group-hover:translate-x-1"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-border-subtle group-hover:bg-foreground transition-colors duration-300"></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
