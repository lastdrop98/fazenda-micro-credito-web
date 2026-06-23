import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Wallet, FileCheck2, Handshake, ShieldCheck, ArrowRight, Play,
  Zap, User, Briefcase, Wheat, Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fazenda Microcrédito — Impulsionamos o teu negócio" },
      { name: "description", content: "Crédito acessível em Moçambique. Montantes até 300.000 MZN, aprovação em 12h. Licenciada pelo Banco de Moçambique." },
      { property: "og:title", content: "Fazenda Microcrédito" },
      { property: "og:description", content: "Crédito acessível em Moçambique. Aprovação rápida em até 12 horas." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <FeaturesBar />
      <Solucoes />
      <Stats />
      <Testimonials />
      <CtaBanner />
    </>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto mt-4 w-[min(1280px,calc(100%-2rem))] overflow-hidden rounded-3xl bg-brand-navy text-white">
      <img
        src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=1600&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/20" />
      <div className="relative grid gap-10 px-6 py-16 md:px-12 lg:grid-cols-2 lg:py-24">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
            Microcrédito em Moçambique
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-6xl">
            Impulsionamos o teu negócio,{" "}
            <span className="text-brand-green">transformamos</span> vidas.
          </h1>
          <p className="mt-5 max-w-md text-base text-white/75">
            A Fazenda Microcrédito oferece soluções de crédito acessíveis para
            ajudar empreendedores a crescerem com confiança e segurança.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contactos" className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-green/25 transition hover:bg-brand-green-dark">
              Solicitar Crédito
            </Link>
            <Link to="/sobre-nos" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Saiba Mais <Play size={14} fill="currentColor" />
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["1494790108377-be9c29b29330","1500648767791-00dcc994a43e","1438761681033-6461ffad8d80"].map((id,i) => (
                <img key={i} src={`https://images.unsplash.com/photo-${id}?w=80&h=80&fit=crop`} alt="" className="h-9 w-9 rounded-full border-2 border-brand-navy object-cover" />
              ))}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-navy bg-brand-green text-[10px] font-bold text-white">+2K</span>
            </div>
            <p className="text-xs text-white/75">Mais de 2.000 negócios apoiados<br/>em todo o país</p>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute bottom-0 right-0 w-72 rounded-2xl bg-brand-green p-6 text-white shadow-2xl">
            <h3 className="text-lg font-bold leading-tight">Crédito ao teu alcance, quando mais precisas.</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white/20 p-2"><Wallet size={16} /></div>
                <div><div className="font-semibold">Montantes até</div><div className="opacity-90">300.000,00 MZN</div></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white/20 p-2"><Zap size={16} /></div>
                <div><div className="font-semibold">Aprovação rápida</div><div className="opacity-90">e sem complicações</div></div>
              </div>
            </div>
            <Link to="/simulacao" className="mt-5 block rounded-xl bg-brand-navy py-3 text-center text-sm font-semibold text-white hover:bg-brand-navy-soft">
              Fazer Simulação
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Wallet, title: "Montantes Flexíveis", desc: "Créditos ajustados à necessidade do teu negócio." },
  { icon: FileCheck2, title: "Processo Simples", desc: "Menos burocracia, mais agilidade na aprovação." },
  { icon: Handshake, title: "Apoio Contínuo", desc: "Acompanhamos o crescimento do teu negócio." },
  { icon: ShieldCheck, title: "Confiança e Segurança", desc: "Transparência e compromisso com o teu sucesso." },
];

function FeaturesBar() {
  return (
    <section className="mx-auto -mt-2 w-[min(1280px,calc(100%-2rem))] rounded-b-3xl bg-brand-navy px-6 py-10 text-white md:px-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-3">
            <div className="rounded-lg border border-brand-green/40 p-2 text-brand-green"><f.icon size={20} /></div>
            <div>
              <h4 className="font-semibold text-brand-green">{f.title}</h4>
              <p className="mt-1 text-sm text-white/65">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const solucoes = [
  { icon: User, title: "Crédito Pessoal", desc: "Soluções rápidas para realizar os teus planos pessoais.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
  { icon: Briefcase, title: "Crédito para Negócios", desc: "Impulsiona o crescimento da tua empresa.", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80" },
  { icon: Wheat, title: "Crédito Agrícola", desc: "Apoio ao produtor para produzir mais e melhor.", img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80" },
];

function Solucoes() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Soluções de Crédito</span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            Soluções para <span className="text-brand-green">cada etapa</span> do teu negócio
          </h2>
          <p className="mt-5 text-sm text-muted-foreground">
            Na Fazenda Microcrédito, acreditamos no potencial dos empreendedores.
            Oferecemos diferentes linhas de crédito para apoiar o crescimento,
            modernização e expansão do teu negócio.
          </p>
          <Link to="/credito" className="mt-6 inline-flex rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark">
            Ver Todas as Soluções
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solucoes.map((s) => (
            <article key={s.title} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-32 overflow-hidden">
                <img src={s.img} alt="" className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-lg bg-brand-green p-2 text-white shadow-lg"><s.icon size={18} /></div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <Link to="/credito" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                  Saber mais <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "2.000+", l: "Negócios Apoiados" },
    { v: "300.000", l: "MZN Crédito Máximo" },
    { v: "12h", l: "Aprovação Rápida" },
    { v: "2023", l: "Licenciada pelo BdM" },
  ];
  return (
    <section className="mx-auto mt-20 w-[min(1280px,calc(100%-2rem))] rounded-3xl bg-brand-green px-6 py-12 text-white md:px-12">
      <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="text-4xl font-extrabold md:text-5xl">{s.v}</div>
            <div className="mt-2 text-sm opacity-90">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { q: "Graças à Fazenda consegui expandir a minha barraca e hoje tenho mais clientes.", n: "Amélia Cossa", r: "Comerciante, Maputo" },
    { q: "O processo foi rápido e o atendimento excelente. Recomendo!", n: "Carlos Machava", r: "Agricultor, Matola" },
    { q: "Finalmente uma instituição que confia em pequenos negócios como o meu.", n: "Fátima Nhantumbo", r: "Costureira, Maputo" },
  ];
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Testemunhos</span>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Histórias que nos inspiram</h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.map((x) => (
          <div key={x.n} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Quote className="text-brand-green" size={28} />
            <p className="mt-3 text-sm leading-relaxed text-foreground">"{x.q}"</p>
            <div className="mt-5 border-t border-border pt-4">
              <div className="font-semibold text-foreground">{x.n}</div>
              <div className="text-xs text-muted-foreground">{x.r}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="mx-auto mt-20 w-[min(1280px,calc(100%-2rem))] overflow-hidden rounded-3xl bg-brand-navy px-6 py-14 text-white md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold md:text-4xl">Pronto para crescer o teu negócio?</h2>
        <p className="mt-3 text-white/75">Solicita o teu crédito hoje e recebe aprovação em até 12 horas.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/contactos" className="rounded-xl bg-brand-green px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-green-dark">Solicitar Crédito</Link>
          <Link to="/simulacao" className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10">Fazer Simulação</Link>
        </div>
      </div>
    </section>
  );
}
