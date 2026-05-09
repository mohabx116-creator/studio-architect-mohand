import { Link } from "@tanstack/react-router";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

export function Footer() {
  const { content } = usePortfolioContent();

  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">
            {content.profile.name}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {content.profile.tagline}
          </p>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Portfolio</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="transition-colors hover:text-accent">About</Link></li>
            <li><Link to="/projects" className="transition-colors hover:text-accent">Projects</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-accent">Contact</Link></li>
            <li><Link to="/admin" className="transition-colors hover:text-accent">Admin</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Contact</p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-muted-foreground">
            {content.profile.location}<br />
            {content.profile.email}<br />
            {content.profile.phone}
          </address>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-luxe flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:gap-0">
          <p>Copyright {new Date().getFullYear()} {content.profile.name}. All rights reserved.</p>
          <p className="tracking-widest uppercase">Architecture / BIM / Visualization</p>
        </div>
      </div>
    </footer>
  );
}
