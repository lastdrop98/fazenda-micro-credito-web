import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Calendar, Zap, Minus, Plus, Loader2, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/lib/supabase";

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
  const [savedId, setSavedId] = useState<string | null>(null);
  const [showRequest, setShowRequest] = useState(false);

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

  async function guardar(thenRequest = false) {
    if (montante < 10000) return toast.error("Montante mínimo: 10.000 MZN");
    setSaving(true);
    const { data, error } = await supabase
      .from("credit_simulations")
      .insert({
        tipo_credito: tipo,
        montante,
        num_periodos: periodos,
        taxa_juros: taxa,
        taxa_preparo: taxaPreparo,
        juros_total: jurosTotal,
        prestacao_por_periodo: prestacao,
        total_a_pagar: totalAPagar,
        nome_cliente: nome || null,
        telefone_cliente: telefone || null,
        email_cliente: email || null,
      })
      .select()
      .single();
    setSaving(false);
    if (error) return toast.error("Erro ao guardar simulação. Tente novamente.");
    setSavedId(data!.id as string);
    toast.success("Simulação guardada com sucesso!");
    if (thenRequest) setShowRequest(true);
  }

  return (
    <>
      <PageHero title="Fazer Simulação de Crédito" breadcrumb="Simulação" subtitle="Simula o teu crédito gratuitamente e descobre as condições disponíveis." />
      <section className="mx-auto mt-12 grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.3fr_1fr]">
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
              <button disabled={saving} onClick={() => guardar(false)} className="hover-btn inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 py-3 text-sm font-semibold disabled:opacity-60">
                {saving ? <><Loader2 className="animate-spin" size={16} /> A enviar...</> : savedId ? <><Check size={16} className="text-brand-green"/> Guardada</> : "Guardar Simulação"}
              </button>
              <button disabled={saving} onClick={() => guardar(true)} className="hover-btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green py-3 text-sm font-semibold text-white disabled:opacity-60">
                {saving ? <><Loader2 className="animate-spin" size={16} /> A enviar...</> : "Solicitar Este Crédito"}
              </button>
            </div>
            <p className="mt-4 text-xs text-white/60">Simulação gratuita e sem compromisso. Os valores são indicativos. A decisão final está sujeita a análise de crédito.</p>
          </div>
        </aside>
      </section>

      {showRequest && (
        <RequestForm tipo={tipo} montante={montante} simulationId={savedId} />
      )}
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

function RequestForm({ tipo, montante, simulationId }: { tipo: string; montante: number; simulationId: string | null }) {
  const [form, setForm] = useState({ nome_completo: "", email: "", telefone: "", finalidade: "Capital de Giro", mensagem: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const schema = z.object({
      nome_completo: z.string().min(2, "Nome muito curto"),
      email: z.string().email("Email inválido"),
      telefone: z.string().min(8, "Telefone inválido"),
    });
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setLoading(true);
    const { error } = await supabase.from("credit_requests").insert({
      ...form,
      tipo_credito: tipo,
      montante_solicitado: montante,
      simulation_id: simulationId,
    });
    setLoading(false);
    if (error) return toast.error("Erro ao enviar pedido. Tente novamente.");
    toast.success("Pedido enviado! A nossa equipa contactá-lo-á em até 12 horas.");
    const resumo = encodeURIComponent(
      `Olá Fazenda Microcrédito!\n\nNome: ${form.nome_completo}\nTelefone: ${form.telefone}\nEmail: ${form.email}\n\nQuero solicitar:\n• Tipo: ${tipo === "mensal" ? "Meu Crédito Fazenda (Mensal 30%)" : "Meu Cash Rápido (Quinzenal 20%)"}\n• Montante: ${new Intl.NumberFormat("pt-PT",{minimumFractionDigits:2}).format(montante)} MZN\n• Finalidade: ${form.finalidade}\n\n${form.mensagem || ""}`,
    );
    window.open(`https://wa.me/258844449380?text=${resumo}`, "_blank");
    setForm({ nome_completo: "", email: "", telefone: "", finalidade: "Capital de Giro", mensagem: "" });
  }

  return (
    <section className="mx-auto mt-16 max-w-3xl px-6">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
        <h2 className="text-2xl font-extrabold">Solicitar Crédito</h2>
        <p className="mt-2 text-sm text-muted-foreground">Preenche os teus dados — entraremos em contacto em até 12h.</p>
        <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input placeholder="Nome completo *" value={form.nome_completo} onChange={(v)=>setForm({...form, nome_completo:v})} />
          <Input placeholder="Email *" type="email" value={form.email} onChange={(v)=>setForm({...form, email:v})} />
          <Input placeholder="Telefone *" value={form.telefone} onChange={(v)=>setForm({...form, telefone:v})} />
          <select value={form.finalidade} onChange={(e)=>setForm({...form, finalidade: e.target.value})} className="rounded-xl border border-border bg-background px-4 py-3 text-sm">
            {["Capital de Giro","Expansão do Negócio","Despesas Pessoais","Agricultura","Outros"].map(o => <option key={o}>{o}</option>)}
          </select>
          <textarea placeholder="Mensagem adicional" value={form.mensagem} onChange={(e)=>setForm({...form, mensagem: e.target.value})} rows={4} className="sm:col-span-2 rounded-xl border border-border bg-background px-4 py-3 text-sm" />
          <button type="submit" disabled={loading} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green py-3.5 font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60">
            {loading && <Loader2 className="animate-spin" size={16}/>} {loading ? "A enviar..." : "Enviar Pedido de Crédito"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Input({ placeholder, value, onChange, type = "text" }: { placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return <input placeholder={placeholder} type={type} value={value} onChange={(e)=>onChange(e.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 text-sm" />;
}