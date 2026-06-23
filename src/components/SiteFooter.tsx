import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t-2 border-brand-green bg-brand-navy text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="rounded-xl bg-white p-3 inline-block">
            <Logo className="h-10" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Microcrédito licenciado pelo Banco de Moçambique. Soluções financeiras
            acessíveis para impulsionar o teu negócio.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-brand-green hover:text-white"><Facebook size={16} /></a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-brand-green hover:text-white"><Instagram size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="rounded-full bg-white/10 p-2 hover:bg-brand-green hover:text-white"><Linkedin size={16} /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Crédito</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/credito" className="hover:text-brand-green">Meu Crédito Fazenda</Link></li>
            <li><Link to="/credito" className="hover:text-brand-green">Meu Cash Rápido</Link></li>
            <li><Link to="/simulacao" className="hover:text-brand-green">Fazer Simulação</Link></li>
            <li><Link to="/credito" className="hover:text-brand-green">Requisitos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Empresa</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sobre-nos" className="hover:text-brand-green">Sobre Nós</Link></li>
            <li><Link to="/como-funciona" className="hover:text-brand-green">Como Funciona</Link></li>
            <li><Link to="/impacto" className="hover:text-brand-green">Impacto</Link></li>
            <li><Link to="/contactos" className="hover:text-brand-green">Contactos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contactos</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-green" /> Av. Base Ntchinga, nº 387, Edifício Karingana, Bairro da Coop, Maputo</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-brand-green" /> +258 84 444 9380</li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-brand-green" /> info@fazenda.co.mz</li>
            <li className="flex gap-2"><Clock size={16} className="mt-0.5 shrink-0 text-brand-green" /> Seg–Sex: 9H00 – 16H00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-white/60">
          © 2025 Fazenda Microcrédito. Todos os direitos reservados. Licenciada pelo Banco de Moçambique.
        </p>
      </div>
    </footer>
  );
}