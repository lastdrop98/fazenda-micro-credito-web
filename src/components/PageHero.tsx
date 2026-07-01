import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHero({
  title,
  breadcrumb,
  subtitle,
  imageSrc,
  imageAlt,
}: {
  title: string;
  breadcrumb?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-brand-navy px-6 pb-16 pt-36 text-white md:px-10 md:pb-20 md:pt-44">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt ?? "Imagem institucional Fazenda Microcrédito"}
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/20" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-brand-navy via-brand-navy/45 to-transparent backdrop-blur-[1px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center gap-2 text-xs text-white/65">
          <Link to="/" className="hover:text-brand-green">Início</Link>
          {breadcrumb && <><ChevronRight size={12} /><span className="text-white/85">{breadcrumb}</span></>}
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-white/78">{subtitle}</p>}
      </div>
    </section>
  );
}