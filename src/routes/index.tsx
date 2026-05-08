import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { projects } from "@/data/projects";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Voss — Architecture & Interiors" },
      { name: "description", content: "Selected works of an architecture and interiors practice working between landscape, craft and the quiet measure of light." },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0">
            <img
              src={hero}
              alt="Cinematic concrete villa at golden hour"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
          </motion.div>

          <motion.div
            style={{ opacity }}
            className="relative z-10 h-full container-luxe flex flex-col justify-end pb-24 md:pb-32 text-white"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="eyebrow text-white/70"
            >
              Atelier Voss · Est. 1998
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-4xl font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02]"
            >
              Architecture <em className="text-accent">measured</em> in light, mass and silence.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-4 text-sm tracking-wider uppercase hover:bg-accent/90 transition-colors"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="text-sm tracking-wider uppercase border-b border-white/40 hover:border-accent hover:text-accent transition-colors pb-1"
              >
                About the Studio
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs tracking-[0.3em] uppercase"
          >
            Scroll
          </motion.div>
        </section>

        {/* Manifesto */}
        <section className="py-32 md:py-48">
          <div className="container-luxe grid md:grid-cols-12 gap-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow text-muted-foreground">Philosophy</p>
            </Reveal>
            <Reveal className="md:col-span-8" delay={0.1}>
              <p className="font-display text-3xl md:text-5xl leading-[1.15]">
                We design buildings that move slowly with the day —
                <span className="text-muted-foreground">
                  {" "}attentive to material, climate and the rituals of those who inhabit them.
                </span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Featured */}
        <section className="pb-32">
          <div className="container-luxe flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow text-muted-foreground">Selected Works</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Featured projects</h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-2 text-sm tracking-wider uppercase hover:text-accent transition-colors"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="container-luxe grid gap-8 md:gap-12 md:grid-cols-12">
            {featured.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 0.1}
                className={
                  i === 0
                    ? "md:col-span-7 md:row-span-2"
                    : i === 1
                    ? "md:col-span-5"
                    : "md:col-span-5 md:col-start-8"
                }
              >
                <ProjectCard project={p} large={i === 0} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProjectCard({
  project,
  large,
}: {
  project: (typeof projects)[number];
  large?: boolean;
}) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group block hover-rise"
    >
      <div className={`relative overflow-hidden bg-muted ${large ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow text-muted-foreground">{project.category} · {project.year}</p>
          <h3 className="mt-2 font-display text-2xl md:text-3xl group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground whitespace-nowrap">{project.location}</p>
      </div>
    </Link>
  );
}
