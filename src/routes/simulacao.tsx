import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Calendar, Zap, Minus, Plus, Loader2, Check, Download, Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";
import logoAsset from "@/assets/fazenda-logo.png.asset.json";
import heroSimulation from "@/assets/hero-simulation.jpg";

const searchSchema = z.object({ tipo: z.enum(["mensal", "quinzenal"]).optional() });

export const Route = createFileRoute("/simulacao")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Simulação de Crédito — Fazenda Microcrédito" },
      { name: "description", content: "Simula gratuitamente o teu crédito e descobre as condições disponíveis." },
      { property: "og:title", content: "Simulação de Crédito" },
      { property: "og:description", content: "Calculadora online de crédito Fazenda Microcrédito." },
    ],
  }),
  component: Simulacao,
});

const fmt = (n: number) =>
  new Intl.NumberFormat("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " MZN";

async function imageToDataUrl(src: string) {
  const response = await fetch(src);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function Simulacao() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState<"mensal" | "quinzenal">(search.tipo ?? "mensal");
  const [montante, setMontante] = useState(50000);
  const [periodos, setPeriodos] = useState(1);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  const { taxa, taxaPreparo, jurosTotal, prestacao, totalAPagar } = useMemo(() => {
    const taxa = tipo === "mensal" ? 0.3 : 0.2;
    const taxaPreparo = Math.min(montante * 0.04, 17500);
    const jurosTotal = montante * taxa * periodos;
    const prestacao = montante / periodos + montante * taxa;
    const totalAPagar = montante + jurosTotal + taxaPreparo;
    return { taxa, taxaPreparo, jurosTotal, prestacao, totalAPagar };
  }, [tipo, montante, periodos]);

  useEffect(() => { setPeriodos(1); }, [tipo]);

  const periodoLabel = tipo === "mensal" ? "mês" : "quinzena";
  const periodosLabel = tipo === "mensal" ? "mes(es)" : "quinzena(s)";

  function simulationPayload(id: string) {
    return {
      id,
      tipo_credito: tipo,
      montante,
      num_periodos: periodos,
      taxa_juros: taxa,
      taxa_preparo: taxaPreparo,
      juros_total: jurosTotal,
      prestacao_por_periodo: prestacao,
      total_a_pagar: totalAPagar,
      nome_cliente: nome.trim() || null,
      telefone_cliente: telefone.trim() || null,
      email_cliente: email.trim() || null,
    };
  }

  async function generatePdf(id?: string | null) {
    const doc = new jsPDF();
    let logoDataUrl: string | null = null;
    try {
      logoDataUrl = await imageToDataUrl(logoAsset.url);
    } catch {
      logoDataUrl = null;
    }
    const periodoLabel = tipo === "mensal" ? "mês" : "quinzena";
    const periodosLabel = tipo === "mensal" ? "mes(es)" : "quinzena(s)";
    const tituloCredito = tipo === "mensal" ? "Meu Crédito Fazenda" : "Meu Cash Rápido";
    doc.setFillColor(26, 35, 50);
    doc.rect(0, 0, 210, 42, "F");
    if (logoDataUrl) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(14, 9, 44, 22, 4, 4, "F");
      doc.addImage(logoDataUrl, "PNG", 18, 12, 36, 16);
    }
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text("Fazenda Microcrédito", 66, 18);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Simulação de Crédito", 66, 26);
    doc.setTextColor(124, 184, 58);
    doc.setFont("helvetica", "bold");
    doc.text(tituloCredito, 66, 34);
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(11);
    let y = 58;
    const heading = (text: string) => {
      doc.setFillColor(232, 245, 208);
      doc.roundedRect(14, y - 6, 182, 10, 2, 2, "F");
      doc.setTextColor(26, 35, 50);
      doc.setFont("helvetica", "bold");
      doc.text(text, 18, y + 1);
      y += 14;
    };
    const line = (k: string, v: string) => {
      const safeValue = v || "—";
      doc.setTextColor(26, 35, 50);
      doc.setFont("helvetica", "bold");
      doc.text(k, 18, y);
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(safeValue, 92), 96, y);
      y += Math.max(8, doc.splitTextToSize(safeValue, 92).length * 6);
    };
    heading("Dados do Cliente");
    line("Data:", new Date().toLocaleString("pt-PT"));
    line("Referência:", id ? id.slice(0, 8).toUpperCase() : "—");
    line("Nome:", nome.trim());
    line("Telefone:", telefone.trim());
    line("Email:", email.trim());
    y += 3;
    heading("Dados da Simulação");
    line("Tipo de Crédito:", tipo === "mensal" ? "Meu Crédito Fazenda (Mensal)" : "Meu Cash Rápido (Quinzenal)");
    line("Montante Solicitado:", fmt(montante));
    line("Taxa de Juros:", `${(taxa * 100).toFixed(0)}% por ${periodoLabel}`);
    line("Número de Períodos:", `${periodos} ${periodosLabel}`);
    line("Taxa de Preparo (4%):", fmt(taxaPreparo));
    line("Juros Total:", fmt(jurosTotal));
    y += 4;
    doc.setFillColor(26, 35, 50);
    doc.roundedRect(14, y, 182, 30, 4, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica","bold");
    doc.text("Prestação por Período", 22, y + 11);
    doc.text("Total a Pagar", 22, y + 23);
    doc.setTextColor(124, 184, 58);
    doc.text(fmt(prestacao), 118, y + 11);
    doc.text(fmt(totalAPagar), 118, y + 23);
    doc.setTextColor(120,120,120); doc.setFont("helvetica","normal"); doc.setFontSize(8);
    doc.text("Simulação indicativa. Sujeita a análise de crédito. Fazenda Microcrédito — Licenciada pelo Banco de Moçambique.", 14, 285);
    doc.save(`simulacao-fazenda-${Date.now()}.pdf`);
  }

  async function guardar() {
    if (montante < 10000) return toast.error("Montante mínimo: 10.000 MZN");
    const id = savedId ?? crypto.randomUUID();
    setSaving(true);
    const { error } = await supabase
      .from("credit_simulations")
      .insert(simulationPayload(id));
    setSaving(false);
    if (error) { toast.error(`Erro ao guardar: ${error.message}. A descarregar PDF mesmo assim.`); await generatePdf(null); return; }
    setSavedId(id);
    toast.success("Simulação guardada! PDF a ser descarregado.");
    await generatePdf(id);
  }

  async function solicitar() {
    if (montante < 10000) return toast.error("Montante mínimo: 10.000 MZN");
    if (!nome || !telefone || !email) return toast.error("Preenche Nome, Telefone e Email para solicitar.");
    setRequesting(true);
    let id = savedId;
    if (!id) {
      id = crypto.randomUUID();
      const { error: simulationError } = await supabase.from("credit_simulations").insert(simulationPayload(id));
      if (simulationError) id = null;
      else setSavedId(id);
    }
    const { error: requestError } = await supabase.from("credit_requests").insert({
      nome_completo: nome, email, telefone,
      tipo_credito: tipo, montante_solicitado: montante,
      finalidade: "Crédito simulado", simulation_id: id,
    });
    setRequesting(false);
    if (requestError) return toast.error(`Erro ao registar pedido: ${requestError.message}`);
    const periodoLabel = tipo === "mensal" ? "mês" : "quinzena";
    const subject = encodeURIComponent(`[Fazenda] Pedido de Crédito - ${nome}`);
    const body =
`Olá Fazenda Microcrédito!

Gostaria de solicitar o crédito conforme a simulação abaixo.

— DADOS DO CLIENTE —
Nome: ${nome}
Telefone: ${telefone}
Email: ${email}

— SIMULAÇÃO —
Tipo: ${tipo === "mensal" ? "Meu Crédito Fazenda (Mensal 30%)" : "Meu Cash Rápido (Quinzenal 20%)"}
Montante Solicitado: ${fmt(montante)}
Taxa de Juros: ${(taxa * 100).toFixed(0)}% por ${periodoLabel}
Períodos: ${periodos}
Taxa de Preparo: ${fmt(taxaPreparo)}
Juros Total: ${fmt(jurosTotal)}
Prestação por Período: ${fmt(prestacao)}
Total a Pagar: ${fmt(totalAPagar)}

Referência: ${id ? id.slice(0, 8).toUpperCase() : "—"}
`;
    toast.success("Pedido registado! A abrir o teu email...");
    window.location.href = `mailto:info@fazenda.co.mz?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <PageHero title="Fazer Simulação de Crédito" breadcrumb="Simulação" subtitle="Simula o teu crédito gratuitamente e descobre as condições disponíveis." imageSrc={heroSimulation} imageAlt="Empreendedor a simular crédito no telemóvel" />
      <section className="w-full px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">1. Tipo de Crédito</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {([
                { id: "mensal", icon: Calendar, t: "Meu Crédito Fazenda", r: "30% ao mês", p: "30 dias" },
                { id: "quinzenal", icon: Zap, t: "Meu Cash Rápido", r: "20% quinzenal", p: "15 dias" },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => { setTipo(opt.id); navigate({ to: "/simulacao", search: { tipo: opt.id } }); }}
                  className={`rounded-2xl border-2 bg-card p-5 text-left transition ${tipo === opt.id ? "border-brand-green shadow-md" : "border-border hover:border-brand-green/50"}`}
                >
                  <opt.icon className={tipo === opt.id ? "text-brand-green" : "text-muted-foreground"} size={26} />
                  <h4 className="mt-3 font-bold">{opt.t}</h4>
                  <p className="mt-1 text-sm font-semibold text-brand-green">{opt.r}</p>
                  <p className="text-xs text-muted-foreground">{opt.p}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">2. Montante Solicitado</h3>
            <div className="mt-4 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-end justify-between">
                <input
                  type="number"
                  min={10000}
                  max={300000}
                  step={5000}
                  value={montante}
                  onChange={(e) => setMontante(Math.max(10000, Math.min(300000, Number(e.target.value) || 0)))}
                  className="w-40 border-0 bg-transparent text-3xl font-extrabold text-brand-green outline-none"
                />
                <span className="text-sm text-muted-foreground">MZN</span>
              </div>
              <input
                type="range"
                min={10000}
                max={300000}
                step={5000}
                value={montante}
                onChange={(e) => setMontante(Number(e.target.value))}
                className="mt-4 w-full accent-[#7CB83A]"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>10.000 MZN</span><span>300.000 MZN</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">3. Número de Períodos</h3>
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
              <button onClick={() => setPeriodos(Math.max(1, periodos - 1))} className="rounded-xl border border-border p-3 hover:bg-muted"><Minus size={18}/></button>
              <div className="flex-1 text-center">
                <div className="text-3xl font-extrabold">{periodos}</div>
                <div className="text-xs text-muted-foreground">{periodosLabel}</div>
              </div>
              <button onClick={() => setPeriodos(Math.min(6, periodos + 1))} className="rounded-xl border border-border p-3 hover:bg-muted"><Plus size={18}/></button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">4. Dados de Contacto (opcional)</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <input value={nome} onChange={(e)=>setNome(e.target.value)} placeholder="Nome" className="rounded-xl border border-border bg-card px-4 py-3 text-sm" />
              <input value={telefone} onChange={(e)=>setTelefone(e.target.value)} placeholder="Telefone" className="rounded-xl border border-border bg-card px-4 py-3 text-sm" />
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="rounded-xl border border-border bg-card px-4 py-3 text-sm" />
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border-2 border-brand-green bg-brand-navy p-6 text-white shadow-xl">
            <h3 className="text-lg font-bold text-brand-green">Resultado da Simulação</h3>
            <dl className="mt-5 space-y-3 text-sm">
              <Row k="Montante Solicitado" v={fmt(montante)} />
              <Row k="Taxa de Juros" v={`${(taxa * 100).toFixed(0)}% por ${periodoLabel}`} />
              <Row k="Número de Períodos" v={`${periodos} ${periodosLabel}`} />
              <Row k="Taxa de Preparo (4%)" v={fmt(taxaPreparo)} />
              <Row k="Juros Total" v={fmt(jurosTotal)} />
              <div className="my-4 border-t border-white/15" />
              <Row k="Prestação por Período" v={fmt(prestacao)} highlight />
              <Row k="Total a Pagar" v={fmt(totalAPagar)} highlight />
            </dl>
            <div className="mt-6 flex flex-col gap-2">
              <button disabled={saving} onClick={guardar} className="hover-btn inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 py-3 text-sm font-semibold disabled:opacity-60">
                {saving ? <><Loader2 className="animate-spin" size={16} /> A guardar...</> : savedId ? <><Check size={16} className="text-brand-green"/> <Download size={14}/> Guardar / PDF</> : <><Download size={14}/> Guardar Simulação (PDF)</>}
              </button>
              <button disabled={requesting} onClick={solicitar} className="hover-btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green py-3 text-sm font-semibold text-white disabled:opacity-60">
                {requesting ? <><Loader2 className="animate-spin" size={16} /> A enviar...</> : <><Mail size={14}/> Solicitar Este Crédito</>}
              </button>
            </div>
            <p className="mt-4 text-xs text-white/60">Simulação gratuita e sem compromisso. Os valores são indicativos. A decisão final está sujeita a análise de crédito.</p>
          </div>
        </aside>
        </div>
      </section>
    </>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-white/70">{k}</dt>
      <dd className={highlight ? "text-brand-green font-bold text-base" : "font-semibold"}>{v}</dd>
    </div>
  );
}