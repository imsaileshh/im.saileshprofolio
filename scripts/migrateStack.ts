import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const frontendTech = [
  { name: 'React.js', type: 'FRONTEND LIBRARY', description: 'Building responsive, interactive interfaces.' },
  { name: 'Next.js', type: 'FRAMEWORK', description: 'Server-side rendering and static site generation.' },
  { name: 'TypeScript', type: 'LANGUAGE', description: 'Type-safe JavaScript development.' },
  { name: 'Tailwind CSS', type: 'STYLING', description: 'Utility-first CSS framework.' },
  { name: 'JavaScript', type: 'LANGUAGE', description: 'Core web interactivity.' },
  { name: 'HTML5', type: 'MARKUP', description: 'Semantic web structure.' },
  { name: 'CSS3', type: 'STYLING', description: 'Modern web styling.' },
];

const backendTech = [
  { name: 'Node.js', type: 'RUNTIME', description: 'Server-side JavaScript execution.' },
  { name: 'Express.js', type: 'FRAMEWORK', description: 'Fast, unopinionated web framework.' },
  { name: 'REST API', type: 'ARCHITECTURE', description: 'Standardized client-server communication.' },
  { name: 'GraphQL', type: 'QUERY LANGUAGE', description: 'Efficient data fetching.' },
];

const databaseTech = [
  { name: 'PostgreSQL', type: 'RELATIONAL DB', description: 'Robust, scalable relational database.' },
  { name: 'MongoDB', type: 'NoSQL DB', description: 'Flexible document-based database.' },
  { name: 'Prisma', type: 'ORM', description: 'Next-generation Node.js and TypeScript ORM.' },
  { name: 'Supabase', type: 'BACKEND AS A SERVICE', description: 'Open source Firebase alternative.' },
];

const toolsTech = [
  { name: 'Git', type: 'VERSION CONTROL', description: 'Distributed version control system.' },
  { name: 'GitHub', type: 'COLLABORATION', description: 'Hosting and collaboration platform.' },
  { name: 'Docker', type: 'CONTAINERIZATION', description: 'Consistent development environments.' },
  { name: 'Vercel', type: 'DEPLOYMENT', description: 'Platform for frontend frameworks and static sites.' },
];

const softwareTech = [
  { name: 'Figma', type: 'DESIGN', description: 'Collaborative interface design tool.' },
  { name: 'Framer', type: 'DESIGN & PROTOTYPING', description: 'Interactive prototyping and site building.' },
  { name: 'VS Code', type: 'EDITOR', description: 'Extensible code editor.' },
  { name: 'Adobe Photoshop', type: 'IMAGE EDITING', description: 'Professional image manipulation.' },
];

async function main() {
  await prisma.skillSection.deleteMany({});
  await prisma.skill.deleteMany({});

  const sections = [
    { title: 'Frontend', desc: 'Building responsive, interactive and scalable interfaces.', tech: frontendTech },
    { title: 'Backend', desc: 'Creating robust server-side architecture and APIs.', tech: backendTech },
    { title: 'Database', desc: 'Managing and structuring application data securely.', tech: databaseTech },
    { title: 'Tools', desc: 'Workflows, deployment, and version control.', tech: toolsTech },
    { title: 'Software', desc: 'Design, prototyping, and development environments.', tech: softwareTech },
  ];

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const section = await prisma.skillSection.create({
      data: {
        title: sec.title,
        description: sec.desc,
        orderIndex: i,
        visible: true,
      }
    });

    for (let j = 0; j < sec.tech.length; j++) {
      const t = sec.tech[j];
      await prisma.skill.create({
        data: {
          name: t.name,
          type: t.type,
          description: t.description,
          sectionId: section.id,
          orderIndex: j,
          visible: true,
        }
      });
    }
  }

  await prisma.siteSettings.update({
    where: { id: 'singleton' },
    data: {
      stackTitle: 'STACK',
      stackDescription: 'Technologies I use to design, build and ship digital products.'
    }
  });

  console.log('Migration complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
