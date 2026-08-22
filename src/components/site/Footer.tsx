import { Link } from "@tanstack/react-router";
import { EmisWhiteBadge } from "@/components/ui/PaymentLogos";

export type FooterVariant = "home" | "loja" | "checkout" | "default";

export function Footer({ variant = "default" }: { variant?: FooterVariant }) {
  return (
    <footer className="mt-16 border-t border-border/60 py-8 bg-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* EMIS Security Badge Row (Fundo Branco Oficial com Link Saber mais) */}
        <div className="mb-6 pb-6 border-b border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start">
            <EmisWhiteBadge />
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 text-xs text-muted-foreground">
            <Link to="/termos" className="hover:text-foreground transition">
              Termos de Uso
            </Link>
            <span className="text-border">·</span>
            <Link to="/privacidade" className="hover:text-foreground transition">
              Privacidade
            </Link>
            <span className="text-border">·</span>
            <Link to="/contactos" className="hover:text-foreground transition">
              Contactos
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            InfroPay © 2026 Todos os direitos reservados
          </p>
          <p className="text-[11px] text-muted-foreground">
            Plataforma de Pagamentos e Produtos Digitais em Angola
          </p>
        </div>
      </div>
    </footer>
  );
}


