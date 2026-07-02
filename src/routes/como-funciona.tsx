import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import heroHow from "@/assets/hero-how.jpg";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Como Funciona — Fazenda Microcrédito" },
      { name: "description", content: "Processo de solicitação de crédito em 5 passos. Aprovação em até 12 horas." },
      { property: "og:title", content: "Como Solicitar o Teu Crédito" },
      { property: "og:description", content: "5 passos simples para o teu crédito Fazenda." },
    ],
  }),
  component: ComoFunciona,
});

const steps = [
  { t: "Faz a Simulação", d: "Usa a nossa calculadora para ver o valor e as condições disponíveis para ti." },
  { t: "Reúne os Documentos", d: "BI/Passaporte, NUIT, comprovativo de domicílio, prova de rendimento, livrança em branco, garantia e cheque pré-datado." },
  { t: "Submete o Pedido", d: "Preenche o formulário ou visita-nos pessoalmente. A nossa equipa irá analisar o teu pedido." },
  { t: "Análise e Aprovação", d: "Com documentação completa, o processo é concluído em até 12 horas." },
  { t: "Desembolso", d: "Após aprovação, o valor é disponibilizado rapidamente." },
];

function ComoFunciona() {
  return (
    <>
      <PageHero title="Como Solicitar o Teu Crédito" breadcrumb="Como Funciona" subtitle="Um processo simples, rápido e transparente em 5 passos." imageSrc={heroHow} imageAlt="Cliente a entregar documentos para pedido de crédito" />
      <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
        <div className="space-y-4 sm:space-y-5">
          {steps.map((s, i) => (
            <div key={s.t} className="relative flex gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-brand-green hover:shadow-md sm:gap-6 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-xl font-extrabold text-white sm:h-14 sm:w-14 sm:text-2xl">{i + 1}</div>
              <div className="min-w-0">
                <h3 className="text-base font-bold sm:text-lg">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}