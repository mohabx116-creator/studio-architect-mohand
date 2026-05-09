import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileDown } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

export const Route = createFileRoute("/projects/$slug")({
  head: () => ({
    meta: [
      { title: "Project | Muhand El-Nady" },
      { name: "description", content: "Architecture project detail by Muhand El-Nady." },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const { content } = usePortfolioContent();
  const project = content.projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <>
        <Header />
        <main className="container-luxe pt-40 pb-24">
          <p className="eyebrow text-muted-foreground">404</p>
          <h1 className="mt-4 font-display text-4xl">Project not found</h1>
          <Link to="/projects" className="mt-6 inline-block text-accent underline-offset-4 hover:underline">Return to projects</Link>
        </main>
        <Footer />
      </>
    );
  }

  const index = content.projects.findIndex((item) => item.slug === project.slug);
  const next = content.projects[(index + 1) % content.projects.length];

  return (
    <>
      <Header />
      <main>
        <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
          <img src={project.cover} alt={project.title} className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
          <div className="container-luxe absolute inset-x-0 bottom-0 pb-16 text-white">
            <Reveal>
              <p className="eyebrow text-white/70">{project.category}</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl md:text-7xl">{project.title}</h1>
              <p className="mt-4 text-white/80">{project.location}</p>
            </Reveal>
          </div>
        </section>

        <section className="container-luxe grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <Reveal className="md:col-span-4">
            <dl className="space-y-8">
              <Meta label="Year" value={String(project.year)} />
              <Meta label="Location" value={project.location} />
              <Meta label="Area" value={project.area} />
              <Meta label="Typology" value={project.category} />
            </dl>
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.1}>
            <p className="eyebrow text-muted-foreground">Project Notes</p>
            <p className="mt-4 font-display text-2xl leading-[1.3] md:text-3xl">{project.description}</p>
            <div className="mt-12">
              <p className="eyebrow text-muted-foreground">Materials</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.materials.map((material) => (
                  <li key={material} className="border border-border px-4 py-2 text-xs uppercase tracking-wider">{material}</li>
                ))}
              </ul>
            </div>
            {project.files?.length ? (
              <div className="mt-12">
                <p className="eyebrow text-muted-foreground">Files</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.files.map((file) => (
                    <a key={file.id} href={file.url} download={file.name} className="flex items-center justify-between gap-4 border border-border p-4 text-sm transition-colors hover:border-accent hover:text-accent">
                      <span>{file.name}</span>
                      <FileDown className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </Reveal>
        </section>

        <section className="container-luxe space-y-6 pb-32 md:space-y-10">
          {project.images.map((image, imageIndex) => (
            <Reveal key={`${image}-${imageIndex}`} delay={imageIndex * 0.05}>
              <div className={`overflow-hidden bg-muted ${imageIndex % 2 === 0 ? "aspect-[16/9]" : "aspect-[3/2] md:ml-auto md:w-2/3"}`}>
                <img src={image} alt={`${project.title} ${imageIndex + 1}`} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          ))}
        </section>

        {next && (
          <section className="border-t border-border">
            <div className="container-luxe flex items-center justify-between gap-6 py-16">
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider transition-colors hover:text-accent">
                <ArrowLeft className="h-4 w-4" /> All projects
              </Link>
              <Link to="/projects/$slug" params={{ slug: next.slug }} className="group text-right">
                <p className="eyebrow text-muted-foreground">Next project</p>
                <p className="mt-2 inline-flex items-center gap-3 font-display text-2xl transition-colors group-hover:text-accent md:text-3xl">
                  {next.title} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-display text-xl">{value}</dd>
    </div>
  );
}
