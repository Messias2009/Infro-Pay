import { Link } from "@tanstack/react-router";

export type FooterVariant = "home" | "loja" | "checkout" | "default";

export function Footer({ variant = "default" }: { variant?: FooterVariant }) {
  if (variant === "home" || variant === "loja") {
    return (
      <footer className="mt-16 border-t border-border/60 py-8 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            InfroPay © 2026 Todos os direitos reservados
          </p>
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
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
