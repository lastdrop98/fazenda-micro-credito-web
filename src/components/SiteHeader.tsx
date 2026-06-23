import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre-nos", label: "Sobre Nós" },
  { to: "/credito", label: "Crédito" },
  { to: "/como-funciona", label: "Como Funciona" },
  { to: "/impacto", label: "Impacto" },
  { to: "/contactos", label: "Contactos" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1280px,calc(100%-2rem))]">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-[0_8px_30px_rgba(26,35,50,0.08)] backdrop-blur-md md:px-6">
        <Link to="/" className="flex items-center" aria-label="Fazenda Microcrédito">
          <Logo className="h-9 md:h-10" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-brand-green"
              activeProps={{ className: "text-brand-green font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/contactos"
            className="hidden rounded-xl bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-dark md:inline-flex"
          >
            Solicitar Crédito
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-2 rounded-2xl border border-border bg-background p-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contactos"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-brand-green px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Solicitar Crédito
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}