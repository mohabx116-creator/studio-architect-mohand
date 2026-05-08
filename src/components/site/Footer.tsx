import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="container-luxe py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">
            Atelier <span className="text-accent">Voss</span>
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            An architecture and interiors practice working between landscape,
            craft and the quiet measure of light.
          </p>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
            <li><Link to="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Visit</p>
          <address className="mt-4 not-italic text-sm text-muted-foreground leading-relaxed">
            14 Quai des Orfèvres<br />
            75001 Paris, France<br />
            +33 1 42 60 18 04
          </address>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-luxe py-6 flex flex-col md:flex-row gap-2 md:gap-0 items-start md:items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Atelier Voss. All rights reserved.</p>
          <p className="tracking-widest uppercase">Architecture · Interiors · Research</p>
        </div>
      </div>
    </footer>
  );
}
