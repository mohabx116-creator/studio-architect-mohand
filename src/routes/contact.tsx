import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atelier Voss" },
      { name: "description", content: "Begin a conversation with Atelier Voss. Studios in Paris and Kyoto, working internationally on residential, commercial and cultural commissions." },
      { property: "og:title", content: "Contact — Atelier Voss" },
      { property: "og:description", content: "Begin a conversation with the studio. New commissions and press inquiries." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  interest: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      interest: fd.get("interest"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
    toast.success("Message received. We'll be in touch shortly.");
  };

  return (
    <>
      <Header />
      <Toaster />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe grid md:grid-cols-12 gap-16">
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-muted-foreground">Begin a Conversation</p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">
              For new commissions, collaborations and press.
            </h1>

            <div className="mt-16 space-y-10">
              <ContactBlock
                label="Paris Studio"
                lines={["14 Quai des Orfèvres", "75001 Paris, France", "+33 1 42 60 18 04"]}
              />
              <ContactBlock
                label="Kyoto Studio"
                lines={["3-12 Gion-machi Kitagawa", "Higashiyama-ku, Kyoto", "+81 75 531 0042"]}
              />
              <ContactBlock
                label="General"
                lines={["studio@ateliervoss.com", "press@ateliervoss.com"]}
              />
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-8">
              <Field name="name" label="Name" error={errors.name} />
              <Field name="email" label="Email" type="email" error={errors.email} />
              <Field name="interest" label="Project interest (optional)" error={errors.interest} />
              <Field name="message" label="Message" textarea error={errors.message} />

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 text-sm tracking-wider uppercase hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          </Reveal>
        </section>

        <section className="mt-32 md:mt-48 border-t border-border">
          <div className="container-luxe py-16 grid md:grid-cols-3 gap-8">
            <p className="eyebrow text-muted-foreground">Studios</p>
            <p className="md:col-span-2 font-display text-2xl md:text-3xl leading-[1.3]">
              Paris · Kyoto. Working internationally across Europe, North
              America and Asia.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ContactBlock({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{label}</p>
      <div className="mt-3 space-y-1 text-sm md:text-base">
        {lines.map((l) => <p key={l}>{l}</p>)}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string;
}) {
  const cls = "w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-base transition-colors";
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-muted-foreground">{label}</label>
      <div className="mt-2">
        {textarea ? (
          <textarea id={name} name={name} rows={5} className={cls + " resize-none"} />
        ) : (
          <input id={name} name={name} type={type} className={cls} />
        )}
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
