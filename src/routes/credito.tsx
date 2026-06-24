import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Calendar, Zap, Check } from "lucide-react";

export const Route = createFileRoute("/credito")({
  head: () => ({
    meta: [
      { title: "Crédito — Fazenda Microcrédito" },
      { name: "description", content: "Soluções de crédito Mensal (30%) e Quinzenal (20%). Montantes até 300.000 MZN." },
      { property: "og:title", content: "As Nossas Soluções de Crédito" },
      { property: "og:description", content: "Crédito Pessoal e ao Comerciante. Taxas e requisitos detalhados." },
    ],
  }),
  component: Credito,
});

const precario: [string, string][] = [
  ["Simulação de crédito", "0,00 MT"],
  ["Taxa de preparo", "4% (máx. 17.500,00 MT)"],
  ["Imposto de selo", "0,00 MT"],
  ["Desembolso", "0,00 MT"],
  ["Emissão 2ª via de cheque", "200,00 MT"],
  ["Extracto de conta de crédito", "0,00 MT"],
  ["Emissão de borderaux", "250,00 MT"],
  ["Taxa de Juros", "20% – 30% (15/30 dias)"],
  ["Juros de mora", "2% + prestação"],
  ["Renegociação de data", "Capitalização + 15%"],
];

const requisitos = [
  "Carta do Pedido (reconhecida em cartório)",
  "Identificação (BI/Passaporte + NUIT)",
  "Comprovativo de Domicílio",
  "Prova de Rendimento Regular",
  "Livrança em Branco (reconhecida em cartório)",
  "Garantia (equivalente a 125% do valor)",
  "Cheque Pré-Datado",
];

function Credito() {
  return (
    <>
      <PageHero title="As Nossas Soluções de Crédito" breadcrumb="Crédito" subtitle="Duas linhas de crédito desenhadas para diferentes necessidades. Escolhe a que melhor se adapta ao teu objectivo." />
      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-3xl border-2 border-brand-green bg-card p-8 shadow-lg">
            <span className="absolute right-6 top-6 rounded-full bg-brand-green px-3 py-1 text-xs font-bold uppercase text-white">Mensal</span>
            <Calendar className="text-brand-green" size={36} />
            <h3 className="mt-4 text-2xl font-extrabold">Meu Crédito Fazenda</h3>
            <p className="mt-2 text-sm text-muted-foreground">Crédito com pagamento mensal, ideal para negócios ou despesas pessoais diversas.</p>
            <div className="my-6">
              <div className="text-5xl font-extrabold text-brand-green">30%<span className="text-base font-medium text-muted-foreground"> ao mês</span></div>
              <div className="mt-1 text-xs text-muted-foreground">Período: 30 dias</div>
            </div>
            <p className="text-sm text-foreground"><strong>Ideal para:</strong> Planear despesas mensais</p>
            <Link to="/simulacao" search={{ tipo: "mensal" }} className="mt-6 block rounded-xl bg-brand-green py-3.5 text-center font-semibold text-white hover:bg-brand-green-dark">Solicitar Este Crédito</Link>
          </article>
          <article className="relative overflow-hidden rounded-3xl border-2 border-brand-navy bg-card p-8 shadow-lg">
            <span className="absolute right-6 top-6 rounded-full bg-brand-navy px-3 py-1 text-xs font-bold uppercase text-white">Quinzenal</span>
            <Zap className="text-brand-navy" size={36} />
            <h3 className="mt-4 text-2xl font-extrabold">Meu Cash Rápido</h3>
            <p className="mt-2 text-sm text-muted-foreground">Crédito de resposta rápida para quem precisa de recursos de forma ágil e com menos burocracia.</p>
            <div className="my-6">
              <div className="text-5xl font-extrabold text-brand-navy">20%<span className="text-base font-medium text-muted-foreground"> quinzenal</span></div>
              <div className="mt-1 text-xs text-muted-foreground">Período: 15 dias</div>
            </div>
            <p className="text-sm text-foreground"><strong>Ideal para:</strong> Despesas imprevistas, oportunidades rápidas</p>
            <Link to="/simulacao" search={{ tipo: "quinzenal" }} className="mt-6 block rounded-xl bg-brand-navy py-3.5 text-center font-semibold text-white hover:bg-brand-navy-soft">Solicitar Este Crédito</Link>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <h2 className="text-3xl font-extrabold">Montantes Disponíveis</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="hover-card rounded-2xl border border-border bg-card p-7">
            <h4 className="font-bold text-brand-green">Crédito Pessoal</h4>
            <p className="mt-2 text-2xl font-extrabold">10.000 – 150.000 MZN</p>
          </div>
          <div className="hover-card rounded-2xl border border-border bg-card p-7">
            <h4 className="font-bold text-brand-green">Crédito ao Comerciante</h4>
            <p className="mt-2 text-2xl font-extrabold">75.000 – 300.000 MZN</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <h2 className="text-3xl font-extrabold">Preçário e Taxas</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <tbody>
              {precario.map(([k, v], i) => (
                <tr key={k} className={i % 2 ? "bg-muted/40" : ""}>
                  <td className="px-6 py-4 font-medium">{k}</td>
                  <td className="px-6 py-4 text-right font-semibold text-brand-green">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <h2 className="text-3xl font-extrabold">Requisitos</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {requisitos.map((r) => (
            <div key={r} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <div className="rounded-full bg-brand-green-light p-1 text-brand-green"><Check size={16} /></div>
              <span className="text-sm font-medium">{r}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}