import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Globe, Loader2, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos — Fazenda Microcrédito" },
      { name: "description", content: "Contacta a Fazenda Microcrédito. Av. Base Ntchinga, Maputo. Tel: +258 84 444 9380." },
      { property: "og:title", content: "Contactos — Fazenda Microcrédito" },
      { property: "og:description", content: "Solicita o teu crédito ou tira as tuas dúvidas." },
    ],
  }),
  component: Contactos,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Nome muito curto").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  assunto: z.string().min(1, "Selecione um assunto"),
  mensagem: z.string().trim().min(5, "Mensagem muito curta").max(1000),
});

function Contactos() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "Solicitar Crédito", mensagem: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<typeof form | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setLoading(false);
    if (error) return toast.error("Erro ao enviar mensagem. Por favor tente novamente.");
    toast.success("Mensagem enviada! A nossa equipa entrará em contacto em breve.");
    setSent(parsed.data);
    setForm({ nome: "", email: "", telefone: "", assunto: "Solicitar Crédito", mensagem: "" });
  }

  function openMail() {
    if (!sent) return;
    const subject = encodeURIComponent(`[Fazenda Website] ${sent.assunto} - ${sent.nome}`);
    const body = encodeURIComponent(
      `Nome: ${sent.nome}\nEmail: ${sent.email}\nTelefone: ${sent.telefone}\nAssunto: ${sent.assunto}\n\nMensagem:\n${sent.mensagem}`,
    );
    window.open(`mailto:info@fazenda.co.mz?subject=${subject}&body=${body}`);
  }
  function openWhatsApp() {
    if (!sent) return;
    const waMsg = encodeURIComponent(
      `Olá Fazenda Microcrédito!\n\nNome: ${sent.nome}\nTelefone: ${sent.telefone}\nAssunto: ${sent.assunto}\n\nMensagem: ${sent.mensagem}`,
    );
    window.open(`https://wa.me/258844449380?text=${waMsg}`, "_blank");
  }

  const info = [
    { icon: MapPin, t: "Endereço", v: "Av. Base Ntchinga, nº 387, Edifício Karingana, Bairro da Coop, Maputo" },
    { icon: Phone, t: "Telefone", v: "+258 84 444 9380  /  +258 84 444 9998" },
    { icon: Mail, t: "Email", v: "info@fazenda.co.mz" },
    { icon: Globe, t: "Website", v: "www.fazenda.co.mz" },
    { icon: Clock, t: "Horário", v: "Segunda a Sexta: 9H00 – 16H00" },
  ];

  return (
    <>
      <PageHero title="Fala Connosco" breadcrumb="Contactos" subtitle="Estamos aqui para ajudar. Solicita o teu crédito ou tira as tuas dúvidas." />
      <section className="mx-auto mt-12 grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold">Informações de Contacto</h2>
          <div className="mt-6 space-y-5">
            {info.map((i) => (
              <div key={i.t} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green"><i.icon size={20}/></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{i.t}</div>
                  <div className="mt-1 text-sm font-medium">{i.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <a href="https://facebook.com/fazendamicrocredito" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-brand-navy p-3 text-white transition hover:bg-brand-green"><Facebook size={18}/></a>
            <a href="https://instagram.com/fazendamicrocredito" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-brand-navy p-3 text-white transition hover:bg-brand-green"><Instagram size={18}/></a>
            <a href="https://linkedin.com/company/fazendamicrocredito" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full bg-brand-navy p-3 text-white transition hover:bg-brand-green"><Linkedin size={18}/></a>
            <a href="https://wa.me/258844449380" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-full bg-brand-navy p-3 text-white transition hover:bg-brand-green"><MessageCircle size={18}/></a>
          </div>

          <a href="https://maps.app.goo.gl/WpvDMgZB7c3i5U7v5" target="_blank" rel="noreferrer" className="mt-6 block overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Localização"
              src="https://www.google.com/maps?q=Bairro+da+Coop,+Maputo&output=embed"
              className="h-64 w-full"
              loading="lazy"
            />
          </a>
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <h2 className="text-2xl font-extrabold">Envia-nos uma mensagem</h2>
          <p className="mt-2 text-sm text-muted-foreground">Responderemos em até 24 horas úteis.</p>
          <div className="mt-6 grid gap-4">
            <Field label="Nome completo *">
              <input value={form.nome} onChange={(e)=>setForm({...form, nome:e.target.value})} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-green focus:outline-none" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email *">
                <input type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-green focus:outline-none" />
              </Field>
              <Field label="Telefone *">
                <input value={form.telefone} onChange={(e)=>setForm({...form, telefone:e.target.value})} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-green focus:outline-none" />
              </Field>
            </div>
            <Field label="Assunto *">
              <select value={form.assunto} onChange={(e)=>setForm({...form, assunto:e.target.value})} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-green focus:outline-none">
                {["Solicitar Crédito","Fazer Simulação","Informações Gerais","Reclamação","Outro"].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Mensagem *">
              <textarea value={form.mensagem} onChange={(e)=>setForm({...form, mensagem:e.target.value})} rows={5} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-green focus:outline-none" />
            </Field>
            <button type="submit" disabled={loading} className="hover-btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green py-3.5 font-semibold text-white disabled:opacity-60">
              {loading && <Loader2 className="animate-spin" size={16}/>} {loading ? "A enviar..." : "Enviar Mensagem"}
            </button>
            {sent && (
              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={openMail} className="hover-btn inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-navy py-3 text-sm font-semibold text-brand-navy">
                  📧 Enviar por Email
                </button>
                <button type="button" onClick={openWhatsApp} className="hover-btn inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white">
                  💬 Enviar por WhatsApp
                </button>
              </div>
            )}
          </div>
        </form>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}