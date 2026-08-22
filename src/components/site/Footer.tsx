import { Link } from "@tanstack/react-router";
import { MessageCircle, Instagram, ShieldCheck } from "lucide-react";
import {
  MulticaixaExpressLogo,
  MulticaixaLogo,
  EmisLogo,
} from "@/components/ui/PaymentLogos";

export type FooterVariant = "home" | "loja" | "checkout" | "default";

export function Footer({ variant = "default" }: { variant?: FooterVariant }) {
  return (
    <footer className="mt-16 border-t border-border/60 py-8 bg-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Payment Methods & EMIS Security Row */}
        <div className="mb-6 pb-6 border-b border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="text-xs text-muted-foreground font-medium mr-1">
              Métodos de Pagamento em Angola:
            </span>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-semibold shadow-xs">
              <MulticaixaExpressLogo className="h-5 w-5" rounded="rounded-md" />
              <span className="text-foreground">Multicaixa Express</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-semibold shadow-xs">
              <MulticaixaLogo className="h-5 w-5" rounded="rounded-md" />
              <span className="text-foreground">Referência Multicaixa</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-foreground">
            <EmisLogo className="h-4 w-auto" />
            <span className="text-[11px] text-orange-500 font-bold">
              Pagamentos Assegurados pela EMIS
            </span>
          </div>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            InfroPay © 2026 Todos os direitos reservados
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 text-xs text-muted-foreground">
            <a
              href="https://wa.me/244932415854"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#25D366] transition font-medium"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <a
              href="https://instagram.com/infropay.ao"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-gold transition font-medium"
            >
              <Instagram className="h-3.5 w-3.5" /> Instagram
            </a>
            {variant !== "home" && variant !== "loja" && (
              <>
                <span className="text-border">|</span>
                <Link to="/termos" className="hover:text-foreground transition">
                  Termos de Uso
                </Link>
                <Link to="/privacidade" className="hover:text-foreground transition">
                  Privacidade
                </Link>
                <Link to="/contactos" className="hover:text-foreground transition">
                  Contactos
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

