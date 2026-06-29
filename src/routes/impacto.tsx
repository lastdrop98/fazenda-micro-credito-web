import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Wheat, Store, Home } from "lucide-react";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";

export const Route = createFileRoute("/impacto")({
  head: () => ({
    meta: [
      { title: "Impacto — Fazenda Microcrédito" },
      { name: "description", content: "O nosso impacto: mais de 2.000 negócios apoiados em Moçambique." },
      { property: "og:title", content: "O Nosso Impacto" },
      { property: "og:description", content: "Apoiando agricultores, comerciantes e famílias em Moçambique." },
    ],
  }),
  component: Impacto,
});

function Impacto() {
  const { ref, visible } = useScrollAnimation<HTMLDivElement>(0.3);
  const a = useCountUp(2000, 2000, visible);
  const b = useCountUp(3, 1500, visible);
  const c = useCountUp(300000, 2200, visible);
  const d = useCountUp(12, 1500, visible);
  const fmt = (n: number) => new Intl.NumberFormat("pt-PT").format(n);
  const stats = [
    { v: `${fmt(a)}+`, l: "Negócios Apoiados" },
    { v: `${b}`, l: "Anos de Operação" },
    { v: `${fmt(c)}`, l: "MZN Montante Máximo" },
    { v: `${d}h`, l: "Aprovação Média" },
  ];
  const cats = [
    { icon: Wheat, t: "Agricultores", d: "Apoiamos produtores rurais com capital para sementes, equipamento e expansão da produção." },
    { icon: Store, t: "Comerciantes", d: "Financiamos pequenos comércios com capital de giro para crescer e responder à procura." },
    { icon: Home, t: "Famílias", d: "Soluções pessoais para imprevistos, educação, saúde e melhoria de qualidade de vida." },
  ];
  return (
    <>
      <PageHero title="O Nosso Impacto" breadcrumb="Impacto" subtitle="Acreditamos no potencial das pessoas. Cada crédito é uma oportunidade de transformação." />
      <section ref={ref} className="mx-auto mt-16 w-[min(1280px,calc(100%-2rem))] rounded-3xl bg-brand-green px-6 py-12 text-white md:px-12">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="text-5xl font-extrabold">{s.v}</div>
              <div className="mt-2 text-sm opacity-90">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-16 max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-extrabold md:text-4xl">A nossa missão</h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Somos uma instituição licenciada pelo <strong className="text-brand-green">Banco de Moçambique</strong> desde Abril de 2023.
          A nossa missão é proporcionar soluções financeiras acessíveis a quem mais precisa,
          contribuindo para o crescimento económico e bem-estar das famílias moçambicanas.
        </p>
      </section>
      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {cats.map((c) => (
            <div key={c.t} className="hover-card rounded-2xl border border-border bg-card p-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green"><c.icon size={26} /></div>
              <h3 className="mt-5 text-xl font-bold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-16 max-w-7xl px-6 text-center">
        <Link to="/contactos" className="inline-flex rounded-xl bg-brand-green px-8 py-4 font-semibold text-white hover:bg-brand-green-dark">Faz parte da nossa história</Link>
      </section>
    </>
  );
}