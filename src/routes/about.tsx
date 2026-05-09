import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Muhand El-Nady" },
      { name: "description", content: "Profile, skills, experience and education for architectural engineer Muhand El-Nady." },
    ],
  }),
  component: AboutPage,
});

export default function AboutPage() {
  const { content, getSection } = usePortfolioContent();
  const about = getSection("about");

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe grid items-end gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">{about.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl">{about.title}</h1>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="leading-relaxed text-muted-foreground">{about.body}</p>
          </Reveal>
        </section>

        <section className="container-luxe mt-24 grid gap-12 md:mt-32 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={content.profile.image} alt={content.profile.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{content.profile.name} / {content.profile.title}</p>
          </Reveal>

          <div className="space-y-12 md:col-span-7">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Focus</p>
              <p className="mt-4 font-display text-2xl leading-[1.3] md:text-3xl">{content.profile.tagline}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow text-muted-foreground">Skills</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.skills.map((skill) => (
                  <span key={skill} className="border border-border px-4 py-2 text-xs uppercase tracking-wider">{skill}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="container-luxe mt-32 md:mt-48">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Experience</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Timeline</h2>
          </Reveal>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {content.experience.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.04}>
                <li className="grid gap-4 py-6 md:grid-cols-12 md:items-baseline">
                  <span className="font-display text-xl text-accent md:col-span-3">{item.period}</span>
                  <span className="font-display text-xl md:col-span-3 md:text-2xl">{item.role}</span>
                  <span className="text-sm text-muted-foreground md:col-span-3">{item.studio}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground md:col-span-3">{item.description}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="container-luxe mt-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Education</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {content.education.map((item) => (
              <Reveal key={item.id}>
                <article className="border border-border p-6">
                  <p className="eyebrow text-muted-foreground">{item.period}</p>
                  <h3 className="mt-3 font-display text-2xl">{item.degree}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.school}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
