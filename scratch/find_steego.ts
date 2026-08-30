import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const caseStudies = await prisma.caseStudy.findMany({
    include: { project: true }
  });
  console.log(JSON.stringify(caseStudies.map(c => ({ title: c.title, slug: c.slug, projectSlug: c.project.slug })), null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
