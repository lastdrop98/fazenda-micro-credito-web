import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

const faqs = [
  { q: "Quem é a Fazenda Microcrédito?", a: "Somos uma instituição financeira licenciada pelo Banco de Moçambique desde 5 de abril de 2023 (Decreto nº 57/2004), especializada em microcrédito para negócios, famílias e indivíduos." },
  { q: "Quais são as vossas linhas de crédito?", a: "Meu Crédito Fazenda (Mensal, 30%) e Meu Cash Rápido (Quinzenal, 20%)." },
  { q: "Quais são as vossas taxas de juros?", a: "20% para a linha quinzenal (15 dias) e 30% para a linha mensal (30 dias). Aplicam-se ainda taxa de preparo de 4% (máx. 17.500 MT) e juros de mora de 2% em caso de atraso." },
  { q: "Qual é o limite de crédito que posso solicitar?", a: "Crédito Pessoal: 10.000–150.000 MZN. Crédito ao Comerciante: 75.000–300.000 MZN. O valor exacto depende da análise de crédito, histórico, garantias e linha escolhida." },
  { q: "Quanto tempo leva o processo de decisão?", a: "Com documentação completa, até 12 horas." },
  { q: "O que acontece se não pagar a tempo?", a: "Juros de mora de 2%, possível registo de inadimplência na Central de Risco, e eventuais acções de cobrança judicial." },
  { q: "Posso solicitar mais de um empréstimo?", a: "Sim, sujeito a análise da capacidade de pagamento e taxa de esforço." },
  { q: "Porquê exigem muitos documentos?", a: "Para garantir segurança, transparência e conformidade com a legislação financeira e de combate ao branqueamento de capitais." },
  { q: "Posso alterar a data de pagamento?", a: "Sim, mediante solicitação e sujeito a taxas de renegociação (Capitalização + 15%)." },
];

function ComoFunciona() {
  return (
    <>
      <PageHero title="Como Solicitar o Teu Crédito" breadcrumb="Como Funciona" subtitle="Um processo simples, rápido e transparente em 5 passos." />
      <section className="mx-auto mt-16 max-w-5xl px-6">
        <div className="space-y-5">
          {steps.map((s, i) => (
            <div key={s.t} className="relative flex gap-6 rounded-2xl border border-border bg-card p-6 transition hover:border-brand-green hover:shadow-md">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-2xl font-extrabold text-white">{i + 1}</div>
              <div>
                <h3 className="text-lg font-bold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl px-6">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">Perguntas <span className="text-brand-green">Frequentes</span></h2>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="overflow-hidden rounded-2xl border border-border bg-card px-5">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}