import { Link } from "@tanstack/react-router";
import { MessageCircle, Instagram } from "lucide-react";

export type FooterVariant = "home" | "loja" | "checkout" | "default";

export function Footer({ variant = "default" }: { variant?: FooterVariant }) {
  if (variant === "home" || variant === "loja") {
    return (
      <footer className="mt-16 border-t border-border/60 py-8 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            InfroPay © 2026 Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="https://wa.me/244932415854"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#25D366] transition font-medium"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <a
              href="https://instagram.com/infropay.ao"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-gold transition font-medium"
            >
              <Instagram className="h-3.5 w-3.5" /> @infropay.ao
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-16 border-t border-border/60 py-8 bg-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-xs text-muted-foreground font-medium">
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
        </div>
      </div>
    </footer>
  );
}
