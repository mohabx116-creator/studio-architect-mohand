import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { categories, projects, type Category } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Atelier Voss" },
      { name: "description", content: "A selection of residential, commercial, cultural and interior projects by Atelier Voss." },
      { property: "og:title", content: "Projects — Atelier Voss" },
      { property: "og:description", content: "A selection of architectural works across residential, commercial, cultural and interior typologies." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [active, setActive] = useState<"All" | Category>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Index</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-4xl leading-[1.05]">
              Built work, measured in <em className="text-accent">place</em> and time.
            </h1>
          </Reveal>

          <div className="mt-16 flex flex-wrap gap-2 border-b border-border pb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-xs tracking-[0.22em] uppercase transition-colors ${
                  active === c
                    ? "text-accent border-b border-accent -mb-[9px]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="container-luxe mt-16">
          <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={i % 5 === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
                >
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="group block hover-rise"
                  >
                    <div className={`relative overflow-hidden bg-muted ${i % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                      <img
                        src={p.cover}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-3">
                      <div>
                        <p className="eyebrow text-muted-foreground">{p.category}</p>
                        <h2 className="mt-2 font-display text-2xl group-hover:text-accent transition-colors">
                          {p.title}
                        </h2>
                      </div>
                      <p className="text-xs text-muted-foreground">{p.year}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
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
