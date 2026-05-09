import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Building2 } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { categories, type Category } from "@/data/projects";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Muhand El-Nady" },
      { name: "description", content: "Selected architecture, BIM and visualization projects by Muhand El-Nady." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [active, setActive] = useState<"All" | Category>("All");
  const { content, getSection } = usePortfolioContent();
  const section = getSection("projects");
  const filtered = active === "All" ? content.projects : content.projects.filter((project) => project.category === active);

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe">
          <Reveal>
            <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">{section.title}</h1>
            <p className="mt-6 max-w-2xl text-muted-foreground">{section.body}</p>
          </Reveal>

          <div className="mt-16 flex flex-wrap gap-2 border-b border-border pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors ${
                  active === category ? "text-accent border-b border-accent -mb-[9px]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="container-luxe mt-16">
          <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.55, delay: (index % 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className={index % 5 === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
                >
                  <Link to="/projects/$slug" params={{ slug: project.slug }} className="group block hover-rise">
                    <div className={`relative overflow-hidden bg-muted ${index % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                      {project.cover ? (
                        <img src={project.cover} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <Building2 className="h-14 w-14 text-accent" />
                        </div>
                      )}
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-3">
                      <div>
                        <p className="eyebrow text-muted-foreground">{project.category}</p>
                        <h2 className="mt-2 font-display text-2xl transition-colors group-hover:text-accent">{project.title}</h2>
                      </div>
                      {project.year && <p className="text-xs text-muted-foreground">{project.year}</p>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
