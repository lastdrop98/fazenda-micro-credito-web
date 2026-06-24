import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Target, Settings2, TrendingUp, CheckCircle2, Scale, Handshake, RefreshCcw, Star } from "lucide-react";

export const Route = createFileRoute("/sobre-nos")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — Fazenda Microcrédito" },
      { name: "description", content: "Conhece a Fazenda Microcrédito, instituição licenciada pelo Banco de Moçambique desde 2023." },
      { property: "og:title", content: "Sobre Nós — Fazenda Microcrédito" },
      { property: "og:description", content: "Missão, visão e valores da Fazenda Microcrédito." },
    ],
  }),
  component: SobreNos,
});

const ambicao = [
  { icon: Target, t: "Soluções Financeiras Personalizadas" },
  { icon: Settings2, t: "Procedimentos Flexíveis" },
  { icon: TrendingUp, t: "Taxas de Juros Atractivas" },
  { icon: CheckCircle2, t: "Cultura de Boas Práticas e Conformidade" },
];
const valores = [
  { icon: Scale, t: "Disciplina", d: "Respeitamos todas as diretrizes legais da República de Moçambique." },
  { icon: Handshake, t: "Respeito Mútuo", d: "Ambiente de cortesia, cordialidade e respeito." },
  { icon: RefreshCcw, t: "Flexibilidade", d: "Procedimentos céleres para garantir eficiência operacional." },
  { icon: Star, t: "Ética", d: "Agimos com integridade, honestidade e sigilo." },
];

function SobreNos() {
  return (
    <>
      <PageHero title="Quem Somos" breadcrumb="Sobre Nós" />
      <section className="mx-auto mt-16 max-w-5xl px-6">
        <p className="text-lg leading-relaxed text-foreground">
          Somos uma instituição financeira especializada na oferta de microcréditos,
          dedicada a promover acesso a crédito. Somos um operador de microcrédito
          <strong className="text-brand-green"> licenciado e regulado pelo Banco de Moçambique</strong>,
          tendo recebido a nossa autorização para operar no dia 5 de abril de 2023,
          de acordo com o Decreto nº 57/2004, de 10 de dezembro.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="hover-card rounded-2xl border border-border bg-card p-7">
            <h3 className="text-xl font-bold text-brand-green">Nossa Missão</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Proporcionar soluções financeiras acessíveis, flexíveis e personalizadas
              às necessidades de negócios, famílias e indivíduos, especialmente aqueles
              que enfrentam dificuldades em obter crédito junto às instituições tradicionais.
            </p>
          </div>
          <div className="hover-card rounded-2xl border border-border bg-card p-7">
            <h3 className="text-xl font-bold text-brand-green">Nossa Visão</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tornar-se o parceiro financeiro preferencial para pequenos negócios, famílias
              e indivíduos, oferecendo soluções financeiras acessíveis e personalizadas que
              atendam às suas necessidades.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">Nossa <span className="text-brand-green">Ambição</span></h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ambicao.map((a) => (
            <div key={a.t} className="hover-card rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green"><a.icon size={22} /></div>
              <h4 className="mt-4 text-sm font-semibold">{a.t}</h4>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">Nossos <span className="text-brand-green">Valores</span></h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((v) => (
            <div key={v.t} className="hover-card rounded-2xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-green"><v.icon size={22} /></div>
              <h4 className="mt-4 font-bold">{v.t}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}