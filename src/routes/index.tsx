import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import type { PortfolioProject, SectionType } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhand El-Nady | Architectural Engineer" },
      { name: "description", content: "Architecture portfolio for Muhand El-Nady: design, BIM, CAD and visualization work." },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const { content, getSection, visibleSections } = usePortfolioContent();

  const renderSection = (id: SectionType) => {
    if (id === "hero") return null;
    if (id === "about") return <AboutPreview key={id} />;
    if (id === "projects") return <FeaturedProjects key={id} projects={content.projects.filter((project) => project.featured)} />;
    if (id === "skills") return <Skills key={id} />;
    if (id === "experience") return <Timeline key={id} type="experience" />;
    if (id === "education") return <Timeline key={id} type="education" />;
    if (id === "publications") return <Publications key={id} />;
    if (id === "cv") return <CvDownload key={id} />;
    if (id === "contact") return <ContactBand key={id} />;
    return null;
  };

  const hero = getSection("hero");

  return (
    <>
      <Header />
      <main>
        <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0">
            <img src={content.profile.heroImage} alt={`${content.profile.name} architectural hero`} className="h-full w-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/75" />
          </motion.div>

          <motion.div style={{ opacity }} className="container-luxe relative z-10 flex h-full flex-col justify-end pb-24 text-white md:pb-32">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="eyebrow text-white/75">
              {hero.eyebrow}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }} className="mt-5 max-w-5xl font-display text-5xl leading-[1.02] md:text-7xl lg:text-8xl">
              {hero.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45 }} className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
              {hero.body}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.65 }} className="mt-10 flex flex-wrap items-center gap-5">
              <Link to="/projects" className="group inline-flex items-center gap-3 bg-accent px-7 py-4 text-sm uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90">
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="border-b border-white/40 pb-1 text-sm uppercase tracking-wider transition-colors hover:border-accent hover:text-accent">
                Contact
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {visibleSections.map((section) => renderSection(section.id))}
      </main>
      <Footer />
    </>
  );
}

function AboutPreview() {
  const { content, getSection } = usePortfolioContent();
  const section = getSection("about");

  return (
    <section className="py-28 md:py-40">
      <div className="container-luxe grid gap-12 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img src={content.profile.image} alt={content.profile.name} className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.1}>
          <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] md:text-6xl">{section.title}</h2>
          <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">{section.body}</p>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-wider transition-colors hover:text-accent">
            Full profile <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedProjects({ projects }: { projects: PortfolioProject[] }) {
  const { getSection } = usePortfolioContent();
  const section = getSection("projects");
  const featured = projects.length ? projects : [];

  return (
    <section className="pb-28 md:pb-36">
      <div className="container-luxe mb-12 flex items-end justify-between">
        <div>
          <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{section.title}</h2>
        </div>
        <Link to="/projects" className="hidden items-center gap-2 text-sm uppercase tracking-wider transition-colors hover:text-accent md:inline-flex">
          All projects <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="container-luxe grid gap-8 md:grid-cols-12 md:gap-12">
        {featured.slice(0, 3).map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.1} className={index === 0 ? "md:col-span-7 md:row-span-2" : index === 1 ? "md:col-span-5" : "md:col-span-5 md:col-start-8"}>
            <ProjectCard project={project} large={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, large }: { project: PortfolioProject; large?: boolean }) {
  return (
    <Link to="/projects/$slug" params={{ slug: project.slug }} className="group block hover-rise">
      <div className={`relative overflow-hidden bg-muted ${large ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        <img src={project.cover} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow text-muted-foreground">{project.category} / {project.year}</p>
          <h3 className="mt-2 font-display text-2xl transition-colors group-hover:text-accent md:text-3xl">{project.title}</h3>
        </div>
        <p className="whitespace-nowrap text-sm text-muted-foreground">{project.location}</p>
      </div>
    </Link>
  );
}

function Skills() {
  const { content, getSection } = usePortfolioContent();
  const section = getSection("skills");

  return (
    <section className="border-y border-border/60 py-20 md:py-28">
      <div className="container-luxe grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl">{section.title}</h2>
        </Reveal>
        <Reveal className="md:col-span-8" delay={0.1}>
          <div className="flex flex-wrap gap-3">
            {content.skills.map((skill) => (
              <span key={skill} className="border border-border px-4 py-2 text-sm uppercase tracking-wider">
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Timeline({ type }: { type: "experience" | "education" }) {
  const { content, getSection } = usePortfolioContent();
  const section = getSection(type);
  const items = type === "experience" ? content.experience : content.education.map((item) => ({
    id: item.id,
    role: item.degree,
    studio: item.school,
    period: item.period,
    description: "",
  }));

  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{section.title}</h2>
        </Reveal>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.04}>
              <div className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline">
                <span className="font-display text-xl text-accent md:col-span-3">{item.period}</span>
                <div className="md:col-span-5">
                  <h3 className="font-display text-2xl">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.studio}</p>
                </div>
                {item.description && <p className="text-sm leading-relaxed text-muted-foreground md:col-span-4">{item.description}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Publications() {
  const { content, getSection } = usePortfolioContent();
  const section = getSection("publications");

  return (
    <section className="bg-muted/45 py-24 md:py-32">
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{section.title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {content.publications.map((item) => (
            <Reveal key={item.id}>
              <article className="border border-border bg-background p-6">
                <p className="eyebrow text-muted-foreground">{item.year}</p>
                <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground">{item.source}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CvDownload() {
  const { content, getSection } = usePortfolioContent();
  const section = getSection("cv");

  return (
    <section className="py-20">
      <div className="container-luxe flex flex-col gap-6 border-y border-border py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl">{section.title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{section.body}</p>
        </div>
        {content.profile.cvUrl ? (
          <a href={content.profile.cvUrl} download className="inline-flex items-center gap-3 bg-foreground px-6 py-4 text-sm uppercase tracking-wider text-background transition-colors hover:bg-accent hover:text-accent-foreground">
            <ArrowDownToLine className="h-4 w-4" /> Download CV
          </a>
        ) : (
          <Link to="/admin" className="inline-flex items-center gap-3 border border-border px-6 py-4 text-sm uppercase tracking-wider transition-colors hover:border-accent hover:text-accent">
            Upload CV
          </Link>
        )}
      </div>
    </section>
  );
}

function ContactBand() {
  const { content, getSection } = usePortfolioContent();
  const section = getSection("contact");

  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe grid gap-8 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-8">
          <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.1] md:text-6xl">{section.title}</h2>
          <p className="mt-6 text-muted-foreground">{section.body}</p>
        </Reveal>
        <Reveal className="md:col-span-4" delay={0.1}>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-accent px-7 py-4 text-sm uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90">
            Start conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
