import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
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
            <a href="https://facebook.com/fazendamicrocredito" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-2 transition hover:bg-brand-green hover:text-white"><Facebook size={16} /></a>
            <a href="https://instagram.com/fazendamicrocredito" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2 transition hover:bg-brand-green hover:text-white"><Instagram size={16} /></a>
            <a href="https://linkedin.com/company/fazendamicrocredito" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full bg-white/10 p-2 transition hover:bg-brand-green hover:text-white"><Linkedin size={16} /></a>
            <a href="https://wa.me/258844449380" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-full bg-white/10 p-2 transition hover:bg-brand-green hover:text-white"><MessageCircle size={16} /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Crédito</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/credito" className="hover-link">Meu Crédito Fazenda</Link></li>
            <li><Link to="/credito" className="hover-link">Meu Cash Rápido</Link></li>
            <li><Link to="/simulacao" className="hover-link">Fazer Simulação</Link></li>
            <li><Link to="/credito" className="hover-link">Requisitos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Empresa</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sobre-nos" className="hover-link">Sobre Nós</Link></li>
            <li><Link to="/como-funciona" className="hover-link">Como Funciona</Link></li>
            <li><Link to="/impacto" className="hover-link">Impacto</Link></li>
            <li><Link to="/contactos" className="hover-link">Contactos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contactos</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://maps.app.goo.gl/WpvDMgZB7c3i5U7v5" target="_blank" rel="noreferrer" className="flex gap-2 hover-link">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-green" />
                <span>Av. Base Ntchinga, nº 387, Edifício Karingana, Bairro da Coop, Maputo</span>
              </a>
            </li>
            <li>
              <a href="tel:+258844449380" className="flex gap-2 hover-link">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-green" /> +258 84 444 9380
              </a>
            </li>
            <li>
              <a href="tel:+258844449998" className="flex gap-2 hover-link">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-green" /> +258 84 444 9998
              </a>
            </li>
            <li>
              <a href="mailto:info@fazenda.co.mz" className="flex gap-2 hover-link">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-green" /> info@fazenda.co.mz
              </a>
            </li>
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