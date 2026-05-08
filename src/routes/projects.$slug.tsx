import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { getProject, projects, type Project } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.project.title} — Atelier Voss` },
            { name: "description", content: loaderData.project.description },
            { property: "og:title", content: `${loaderData.project.title} — Atelier Voss` },
            { property: "og:description", content: loaderData.project.description },
            { property: "og:image", content: loaderData.project.cover },
            { name: "twitter:image", content: loaderData.project.cover },
          ],
        }
      : { meta: [{ title: "Project — Atelier Voss" }] },
  notFoundComponent: () => (
    <>
      <Header />
      <main className="container-luxe pt-40 pb-24">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="mt-4 font-display text-4xl">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-block text-accent underline-offset-4 hover:underline">
          Return to projects
        </Link>
      </main>
      <Footer />
    </>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
          <img
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
          <div className="absolute inset-x-0 bottom-0 container-luxe pb-16 text-white">
            <Reveal>
              <p className="eyebrow text-white/70">{project.category}</p>
              <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-4xl">{project.title}</h1>
              <p className="mt-4 text-white/80">{project.location}</p>
            </Reveal>
          </div>
        </section>

        {/* Meta + Description */}
        <section className="container-luxe py-24 md:py-32 grid md:grid-cols-12 gap-12">
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
            <p className="mt-4 font-display text-2xl md:text-3xl leading-[1.3]">
              {project.description}
            </p>
            <div className="mt-12">
              <p className="eyebrow text-muted-foreground">Materials</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.materials.map((m: string) => (
                  <li
                    key={m}
                    className="px-4 py-2 border border-border text-xs tracking-wider uppercase"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Gallery */}
        <section className="container-luxe space-y-6 md:space-y-10 pb-32">
          {project.images.map((img: string, i: number) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className={`overflow-hidden bg-muted ${i % 2 === 0 ? "aspect-[16/9]" : "aspect-[3/2] md:w-2/3 md:ml-auto"}`}>
                <img src={img} alt={`${project.title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          ))}
        </section>

        {/* Next */}
        <section className="border-t border-border">
          <div className="container-luxe py-16 flex items-center justify-between gap-6">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm tracking-wider uppercase hover:text-accent transition-colors">
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group text-right"
            >
              <p className="eyebrow text-muted-foreground">Next project</p>
              <p className="mt-2 font-display text-2xl md:text-3xl group-hover:text-accent transition-colors inline-flex items-center gap-3">
                {next.title} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          </div>
        </section>
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
