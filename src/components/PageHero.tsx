import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHero({ title, breadcrumb, subtitle }: { title: string; breadcrumb?: string; subtitle?: string }) {
  return (
    <section className="mx-auto mt-28 w-[min(1280px,calc(100%-2rem))] rounded-3xl bg-brand-navy px-6 py-16 text-white md:px-12 md:py-20">
      <div className="flex items-center gap-2 text-xs text-white/60">
        <Link to="/" className="hover:text-brand-green">Início</Link>
        {breadcrumb && <><ChevronRight size={12} /><span className="text-white/80">{breadcrumb}</span></>}
      </div>
      <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-white/75">{subtitle}</p>}
    </section>
  );
}