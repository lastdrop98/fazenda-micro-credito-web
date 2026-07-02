import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Mail } from "lucide-react";
import heroFaq from "@/assets/hero-faq.jpg";

export const Route = createFileRoute("/perguntas-frequentes")({
  head: () => ({
    meta: [
      { title: "Perguntas Frequentes — Fazenda Microcrédito" },
      { name: "description", content: "Respostas às dúvidas mais comuns sobre os créditos, taxas, documentação e processos da Fazenda Microcrédito." },
      { property: "og:title", content: "Perguntas Frequentes — Fazenda Microcrédito" },
      { property: "og:description", content: "Tudo o que precisas de saber sobre o Meu Crédito Fazenda e o Meu Cash Rápido." },
    ],
  }),
  component: PerguntasFrequentes,
});

type Faq = { q: string; a: string };
type Group = { title: string; items: Faq[] };

const groups: Group[] = [
  {
    title: "Sobre a Fazenda",
    items: [
      {
        q: "Quem é a Fazenda Microcrédito?",
        a: "Somos uma instituição financeira especializada na oferta de microcréditos, dedicada a promover o acesso ao crédito. Somos um operador de microcrédito licenciado e regulado pelo Banco de Moçambique, tendo recebido a nossa autorização para operar no dia 5 de Abril de 2023, ao abrigo do Decreto nº 57/2004, de 10 de Dezembro, que regula as actividades de instituições financeiras não bancárias no país. A nossa missão é proporcionar soluções financeiras acessíveis, flexíveis e personalizadas às necessidades de negócios, famílias e indivíduos, especialmente aqueles que enfrentam dificuldades em obter crédito junto das instituições tradicionais.",
      },
      {
        q: "Onde estão localizados?",
        a: "Estamos localizados na Avenida Base Ntchinga, nº 387, Edifício Karingana, Bairro da Coop, na cidade de Maputo. Podes conhecer melhor os nossos serviços em www.fazenda.co.mz ou contactar-nos pelo +258 84 444 9380.",
      },
    ],
  },
  {
    title: "Linhas de Crédito e Taxas",
    items: [
      {
        q: "Quais são as vossas linhas de crédito?",
        a: "Disponibilizamos duas linhas de crédito: Meu Crédito Fazenda (Mensal) — ideal para negócios ou despesas pessoais, permitindo planear as despesas e ajustar a prestação aos rendimentos mensais; e Meu Cash Rápido (Quinzenal) — crédito de resposta rápida, com pagamento a cada quinzena, para quem precisa de recursos ágeis, com menos burocracia.",
      },
      {
        q: "Quais são as vossas taxas de juros?",
        a: "Meu Crédito Fazenda: juros mensais de 30% aplicados sobre o valor financiado. Meu Cash Rápido: juros quinzenais de 20% sobre o valor emprestado. Em caso de atraso no pagamento aplica-se uma penalização adicional (juros de mora de 2% ao mês ou por período de atraso).",
      },
      {
        q: "O que é a taxa de juros de mora?",
        a: "É uma penalização aplicada ao cliente que não efectua o pagamento na data prevista. Consiste numa tarifa adicional que incide sobre o valor em atraso, proporcional ao tempo de atraso, até que a dívida seja totalmente quitada. Serve para compensar os custos e prejuízos provocados pelo incumprimento.",
      },
      {
        q: "Qual é o limite de crédito que posso solicitar?",
        a: "O limite depende da capacidade de pagamento, histórico de crédito, garantias oferecidas e da linha escolhida. Fazemos uma análise de risco para propor um valor compatível com a tua realidade financeira. Podes começar por fazer uma simulação online no simulador do nosso website.",
      },
    ],
  },
  {
    title: "Prazos e Prestações",
    items: [
      {
        q: "Qual é a periodicidade de pagamento?",
        a: "A duração dos nossos créditos varia entre 15 e 30 dias, dependendo da linha escolhida e das condições negociadas com o cliente. Esta periodicidade oferece flexibilidade para organizar os pagamentos de forma prática e conveniente.",
      },
      {
        q: "Em quantas prestações posso pagar?",
        a: "Embora cada período do crédito seja de 15 a 30 dias, o crédito pode ser parcelado em vários períodos, permitindo maior flexibilidade. Em cada período incide a taxa de juros correspondente à linha escolhida. A nossa equipa ajuda a planear o melhor método de pagamento de acordo com o teu rendimento.",
      },
      {
        q: "Quanto tempo leva o processo de decisão?",
        a: "Com a documentação completa, correcta e consistente, o processo pode ser concluído em até 12 horas. Caso sejam necessárias informações adicionais, o prazo pode ser estendido.",
      },
    ],
  },
  {
    title: "Documentação e Garantias",
    items: [
      {
        q: "Que documentos preciso apresentar?",
        a: "1) Carta de pedido segundo o nosso modelo, reconhecida em cartório e assinada pelo requerente. 2) Cópia de documento de identidade válido (BI ou passaporte) e do NUIT. 3) Comprovativo de domicílio (factura de serviço público ou contrato de arrendamento). 4) Prova de rendimento regular (extracto bancário recente ou carta de consignação salarial). 5) Livrança em branco assinada e reconhecida em cartório pelo solicitante, cônjuge (em caso de casamento) e possíveis avalistas. 6) Garantia equivalente a 125% do valor solicitado. 7) Cheque pré-datado em nome do cliente.",
      },
      {
        q: "Porquê exigem tantos documentos?",
        a: "Para garantir segurança e transparência na concessão do crédito. Permite uma análise completa da situação financeira, capacidade de pagamento e condições de garantia, minimizando riscos para o cliente e para a instituição. Alinha também a nossa postura à legislação financeira e de combate ao branqueamento de capitais.",
      },
      {
        q: "Qual é o papel do avalista?",
        a: "O avalista garante o pagamento da dívida caso o cliente principal não consiga cumprir as suas obrigações. Fornece uma garantia adicional à instituição, assinando a livrança ou documento específico, e compromete-se a pagar o valor devido em caso de incumprimento do devedor principal.",
      },
      {
        q: "Porquê o meu cônjuge deve assinar o processo de crédito?",
        a: "Por questões de coobrigação legal, sobretudo quando o crédito ou a garantia pode envolver bens comuns do casamento. O cônjuge é considerado coobrigado por direitos e responsabilidades partilhadas, e a sua assinatura confirma que está ciente e concorda com a operação, protegendo ambas as partes.",
      },
    ],
  },
  {
    title: "Pagamentos e Incumprimento",
    items: [
      {
        q: "O que acontece se não pagar a tempo?",
        a: "Aplicam-se juros de mora sobre o valor não pago, podendo haver multa contratual por atraso. O nome do cliente pode ser inscrito na Central de Risco, dificultando a obtenção de novos créditos. A instituição pode ainda recorrer a cobrança extrajudicial ou judicial para recuperar o valor devido, o que poderá afectar futuras operações de crédito.",
      },
      {
        q: "O que acontece se não tiver capacidade de pagar a dívida?",
        a: "1) A dívida entra em atraso, com multas, juros de mora e outros encargos. 2) Em atrasos prolongados, o nome pode ser negativado nos órgãos de protecção ao crédito, como a Central de Risco. 3) Podem ser iniciadas acções de cobrança extrajudicial ou judicial. 4) Em processos judiciais pode haver penhora de bens (imóveis, veículos ou salários). 5) Oferecemos também opções de renegociação e parcelamento — fala connosco cedo.",
      },
      {
        q: "Posso passar a minha dívida para um amigo ou familiar?",
        a: "Depende das condições do contrato. Juridicamente a dívida é do cliente solicitante; se existir avalista, a lei permite responsabilizá-lo. Ainda assim, o cliente pode recorrer ao apoio de terceiros para liquidar a dívida.",
      },
      {
        q: "Posso alterar a data de pagamento de uma prestação?",
        a: "Sim, mediante solicitação do cliente e conforme as condições do contrato. Verificamos as taxas ou custos inerentes a essa alteração antes de a formalizar.",
      },
      {
        q: "Posso solicitar mais de um empréstimo?",
        a: "Sim, é possível ter mais do que um empréstimo em simultâneo. A aprovação depende do rendimento comprovado, da taxa de esforço, do valor total dos empréstimos e da capacidade global de pagamento.",
      },
      {
        q: "Posso pagar apenas os juros e depois o capital?",
        a: "A partir do desembolso, o valor recebido acrescido dos juros passa a denominar-se Prestação de Crédito, que é o valor devido pelo cliente. Em caso de incapacidade, pode renegociar o prazo de pagamento da sua prestação connosco.",
      },
    ],
  },
];

function PerguntasFrequentes() {
  const waBase = "https://api.whatsapp.com/send?phone=258844449380&text=";
  const email = "info@fazenda.co.mz";
  const buildMail = (subject: string, body: string) =>
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const waLink = (msg: string) => waBase + encodeURIComponent(msg);

  return (
    <>
      <PageHero
        title="Perguntas Frequentes"
        breadcrumb="Perguntas Frequentes"
        subtitle="Reunimos aqui as dúvidas mais comuns sobre os nossos créditos, taxas, documentos e processos."
        imageSrc={heroFaq}
        imageAlt="Consultora Fazenda Microcrédito a esclarecer dúvidas de uma cliente"
      />

      <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Accordion
            type="single"
            collapsible
            defaultValue="group-0"
            className="space-y-4"
          >
            {groups.map((group, gi) => (
              <AccordionItem
                key={group.title}
                value={`group-${gi}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-4 sm:px-5"
              >
                <AccordionTrigger className="py-5 hover:no-underline">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green text-xs font-extrabold text-white sm:h-10 sm:w-10 sm:text-sm">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h2 className="truncate text-lg font-extrabold sm:text-xl md:text-2xl">
                      {group.title.split(" ")[0]}{" "}
                      <span className="text-brand-green">
                        {group.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <Accordion type="single" collapsible className="space-y-2 sm:space-y-3">
                    {group.items.map((f, i) => (
                      <AccordionItem
                        key={i}
                        value={`${gi}-${i}`}
                        className="overflow-hidden rounded-xl border border-border bg-background px-4 sm:px-5"
                      >
                        <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
                          {f.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                          {f.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="w-full px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-4xl rounded-3xl border-2 border-brand-green bg-brand-navy p-6 text-white sm:p-8 md:p-12">
          <h3 className="text-xl font-extrabold sm:text-2xl md:text-3xl">
            Ainda tens <span className="text-brand-green">dúvidas?</span>
          </h3>
          <p className="mt-3 text-white/80">
            Fala connosco por WhatsApp ou email — respondemos com o assunto da tua pergunta.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {groups.map((g) => {
              const subject = `Dúvida — ${g.title}`;
              const msg = `Olá Fazenda Microcrédito, tenho uma dúvida sobre "${g.title}".`;
              return (
                <div
                  key={g.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4"
                >
                  <p className="text-sm font-semibold">{g.title}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={waLink(msg)}
                      target="_blank"
                      rel="noreferrer"
                      className="hover-btn inline-flex items-center gap-2 rounded-lg bg-brand-green px-3 py-2 text-xs font-semibold text-white"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a
                      href={buildMail(subject, msg)}
                      className="hover-btn inline-flex items-center gap-2 rounded-lg border border-white/40 px-3 py-2 text-xs font-semibold"
                    >
                      <Mail size={14} /> Email
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}