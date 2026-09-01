import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, FileText, Layers, Sparkles, Terminal } from 'lucide-react';
import { prisma } from '@/lib/database/prisma';
import { getTechLogo } from '@/lib/stack/tech-logos';

export const metadata = {
  title: 'Case Studies | Sailesh P — Product Designer',
  description: 'In-depth UX/UI design case studies, design systems, and product thinking.',
};

export const dynamic = 'force-dynamic';

export default async function CaseStudiesPublicPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      sections: { orderBy: { order: 'asc' } },
      project: { include: { images: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 sm:px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ── Page Header ── */}
        <header className="border-b border-border-subtle/60 pb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <FileText size={18} className="text-accent shrink-0" strokeWidth={2.5} />
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium mt-[1px] block">
              CASE STUDIES
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1]">
            Case Studies
          </h1>
          <p className="text-muted text-base sm:text-lg mt-3 max-w-2xl leading-relaxed font-normal">
            In-depth product design stories, UX research, design systems, and interactive prototypes.
          </p>
        </header>

        {/* ── Case Studies Showcase Grid ── */}
        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
            {caseStudies.map((caseStudy) => {
              const coverUrl = caseStudy.coverImage || caseStudy.project?.coverImageUrl || `/images/projects/project1.svg`;
              const metadata = (caseStudy.metadata as any) || {};
              const techList: string[] = metadata.technologies || caseStudy.project?.technologies || ['Figma', 'React', 'Tailwind CSS'];
              const year = metadata.year || caseStudy.project?.year || '2025';
              const category = metadata.category || caseStudy.project?.category || 'Product Design';
              const sectionCount = caseStudy.sections?.length || 0;

              return (
                <article
                  key={caseStudy.id}
                  className="group relative flex flex-col rounded-[22px] bg-[var(--card)] border border-border-subtle/80 hover:border-border-subtle p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-[0_16px_44px_rgba(0,0,0,0.3)] text-left"
                >
                  {/* Top Cover Visual */}
                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-[#111214] mb-5 block"
                  >
                    <Image
                      src={coverUrl}
                      alt={caseStudy.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Top Right Year Pill */}
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10.5px] font-mono text-white/90 shadow-sm z-10">
                      {year}
                    </div>

                    {/* Top Left Section Count */}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10.5px] font-mono text-white/90 shadow-sm z-10 flex items-center gap-1">
                      <Layers size={11} className="text-[#4F8CFF]" />
                      <span>{sectionCount} Sections</span>
                    </div>
                  </Link>

                  {/* Category */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-accent font-semibold">
                      {category}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/case-studies/${caseStudy.slug}`}>
                    <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-foreground leading-snug transition-colors duration-200 group-hover:text-accent mb-2.5">
                      {caseStudy.title}
                    </h2>
                  </Link>

                  {/* Short Description */}
                  <p className="text-sm text-muted leading-relaxed font-normal mb-5 flex-1 line-clamp-2">
                    {caseStudy.description || caseStudy.project?.description || 'Comprehensive design process, research, and interactive prototypes.'}
                  </p>

                  {/* Technologies with live Stack SVG icons */}
                  {techList && techList.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-5">
                      {techList.slice(0, 4).map((tech) => {
                        const logo = getTechLogo(tech);

                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--sidebar)] border border-border-subtle/60 text-[11px] font-mono text-foreground shadow-xs"
                          >
                            {logo && (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={logo.url}
                                alt=""
                                width={12}
                                height={12}
                                className="w-3 h-3 object-contain shrink-0"
                                style={logo.filter ? { filter: logo.filter } : undefined}
                              />
                            )}
                            <span>{tech}</span>
                          </span>
                        );
                      })}
                      {techList.length > 4 && (
                        <span className="text-[11px] font-mono text-muted/60 self-center">
                          +{techList.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer CTA */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-border-subtle/50 mt-auto">
                    <span className="text-xs font-mono text-muted/70">Read Case Study</span>
                    <Link
                      href={`/case-studies/${caseStudy.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:text-accent transition-colors"
                    >
                      <span>Explore Story</span>
                      <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border-subtle bg-[var(--card)] p-12 text-center">
            <Sparkles size={28} className="mx-auto text-accent mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Case Studies in Progress</h3>
            <p className="text-sm text-muted max-w-md mx-auto">
              In-depth product design case studies are currently being crafted. Check back soon.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
