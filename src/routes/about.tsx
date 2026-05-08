import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import architect from "@/assets/architect.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — Atelier Voss" },
      { name: "description", content: "Atelier Voss is an architecture and interiors practice founded by Elias Voss in 1998, with studios in Paris and Kyoto." },
      { property: "og:title", content: "Studio — Atelier Voss" },
      { property: "og:description", content: "Founded in 1998 by Elias Voss. Studios in Paris and Kyoto." },
    ],
  }),
  component: AboutPage,
});

const awards = [
  { year: "2024", title: "Mies van der Rohe Award", note: "Finalist · Casa Umbria" },
  { year: "2023", title: "RIBA International Prize", note: "Shortlist · Atrium Tower" },
  { year: "2022", title: "AR House Award", note: "Winner · Cliff House" },
  { year: "2021", title: "Wallpaper* Design Award", note: "Best Private House" },
  { year: "2019", title: "Architectural Review Future Project", note: "Cultural · Stone Pavilion" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe grid md:grid-cols-12 gap-12 items-end">
          <Reveal className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">The Studio</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05]">
              A practice of <em className="text-accent">slow</em> architecture.
            </h1>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="text-muted-foreground leading-relaxed">
              Founded in Paris in 1998 by Elias Voss, the atelier works at the
              intersection of architecture, interiors and landscape — across
              Europe, North America and Japan.
            </p>
          </Reveal>
        </section>

        <section className="container-luxe mt-24 md:mt-32 grid md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={architect} alt="Elias Voss in studio" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Elias Voss · Founder & Principal</p>
          </Reveal>

          <div className="md:col-span-7 space-y-10">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Philosophy</p>
              <p className="mt-4 font-display text-2xl md:text-3xl leading-[1.3]">
                Each project begins with a study of place — the angle of light at
                noon, the prevailing wind, the texture of a local stone — and
                ends with the quiet rituals of those who will inhabit it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed">
                The studio is intentionally small — a team of fourteen
                architects, interior designers and craftspeople — allowing
                close collaboration with clients and a sustained engagement
                with each commission from concept through to detail. Built
                work has been published in <em>Domus</em>, <em>El Croquis</em>{" "}
                and <em>Casabella</em>.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="container-luxe mt-32 md:mt-48">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Recognition</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Selected awards</h2>
          </Reveal>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {awards.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.04}>
                <li className="grid grid-cols-12 gap-4 py-6 items-baseline">
                  <span className="col-span-2 font-display text-xl text-accent">{a.year}</span>
                  <span className="col-span-7 font-display text-xl md:text-2xl">{a.title}</span>
                  <span className="col-span-3 text-right text-sm text-muted-foreground">{a.note}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
