export type FooterVariant = "home" | "loja" | "checkout" | "default";

export function Footer({ variant = "default" }: { variant?: FooterVariant }) {
  // Ultra-simplified, single-line institutional footer across the application
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
