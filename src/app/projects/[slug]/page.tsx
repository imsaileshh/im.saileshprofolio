import { notFound } from 'next/navigation';
import { prisma } from '@/lib/database/prisma';
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PdfPagesViewer } from '@/components/case-study/PdfPagesViewerDynamic';
import { SteeGoCaseStudyContent } from '@/components/case-study/SteeGoCaseStudyContent';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const project = await prisma.project.findUnique({
    where: { 
      slug: resolvedParams.slug,
      published: true,
      archived: false
    },
    include: {
      images: { orderBy: { order: 'asc' } },
      caseStudy: {
        include: {
          sections: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!project) notFound();

  const caseStudy = project.caseStudy;
  const cover = caseStudy?.coverImage || project.images.find(img => img.isCover)?.url || project.images[0]?.url || project.coverImageUrl;

  const metadata = caseStudy?.metadata as any;
  const subtitle = metadata?.subtitle;
  const heroDescription = metadata?.hero?.description || caseStudy?.description || project.description;

  return (
    <main className="min-h-screen bg-[#0A0A0A] selection:bg-[#4F8CFF]/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link 
          href="/projects" 
          className="group mb-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={16} className=" transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <header className="mb-16 lg:mb-24">
          <div className="max-w-3xl">
            {subtitle && (
              <h2 className="mb-4 text-sm font-bold tracking-widest text-[#4F8CFF] uppercase">
                {subtitle}
              </h2>
            )}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {caseStudy?.title || project.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400 sm:text-xl">
              {heroDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {project.role && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-zinc-600">Role</dt>
                <dd className="mt-2 text-sm text-zinc-300">{project.role}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-zinc-600">Year</dt>
                <dd className="mt-2 text-sm text-zinc-300">{project.year}</dd>
              </div>
            )}
            {project.category && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-zinc-600">Category</dt>
                <dd className="mt-2 text-sm text-zinc-300">{project.category}</dd>
              </div>
            )}
            {project.liveUrl && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-zinc-600">Live URL</dt>
                <dd className="mt-2">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-[#4F8CFF] hover:underline">
                    View Project <ArrowUpRight size={14} />
                  </a>
                </dd>
              </div>
            )}
          </div>
        </header>

        {cover && (
          <div className="relative mb-24 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50">
            <Image src={cover} alt={project.title} fill className="object-cover" priority />
          </div>
        )}

        {caseStudy && caseStudy.sourceType === 'PDF' && caseStudy.sourcePdf ? (
          <PdfPagesViewer url={caseStudy.sourcePdf} />
        ) : caseStudy && caseStudy.slug === 'fndfgh-case-study' ? (
          <SteeGoCaseStudyContent caseStudy={caseStudy} />
        ) : caseStudy ? (
          <CaseStudyContent caseStudy={caseStudy} />
        ) : (
          <div className="prose prose-invert prose-zinc max-w-none">
            {project.longText ? (
              <div dangerouslySetInnerHTML={{ __html: project.longText }} />
            ) : (
              <p className="text-lg text-zinc-400">Detailed case study coming soon.</p>
            )}
            
            {project.galleryImages.length > 0 && (
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryImages.map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                    <Image src={img} alt={`Gallery image ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
