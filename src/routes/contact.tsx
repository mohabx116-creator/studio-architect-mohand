import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Muhand El-Nady" },
      { name: "description", content: "Contact Muhand El-Nady for architecture, BIM and visualization work." },
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
  const { content, getSection } = usePortfolioContent();
  const section = getSection("contact");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
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
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    form.reset();
    toast.success("Message captured locally. Connect an email service before production.");
  };

  return (
    <>
      <Header />
      <Toaster />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-muted-foreground">{section.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">{section.title}</h1>
            <p className="mt-6 leading-relaxed text-muted-foreground">{section.body}</p>

            <div className="mt-16 space-y-10">
              <ContactBlock label="Location" lines={[content.profile.location]} />
              <ContactBlock label="Direct" lines={[content.profile.email, content.profile.phone]} />
              <ContactBlock label="Social" lines={[content.profile.linkedin]} />
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-8">
              <Field name="name" label="Name" error={errors.name} />
              <Field name="email" label="Email" type="email" error={errors.email} />
              <Field name="interest" label="Project interest (optional)" error={errors.interest} />
              <Field name="message" label="Message" textarea error={errors.message} />

              <button type="submit" disabled={submitting} className="group inline-flex items-center gap-3 bg-foreground px-7 py-4 text-sm uppercase tracking-wider text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60">
                {submitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </Reveal>
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
        {lines.map((line) => <p key={line}>{line}</p>)}
      </div>
    </div>
  );
}

function Field({ name, label, type = "text", textarea, error }: { name: string; label: string; type?: string; textarea?: boolean; error?: string }) {
  const cls = "w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-base transition-colors";
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-muted-foreground">{label}</label>
      <div className="mt-2">
        {textarea ? <textarea id={name} name={name} rows={5} className={`${cls} resize-none`} /> : <input id={name} name={name} type={type} className={cls} />}
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
