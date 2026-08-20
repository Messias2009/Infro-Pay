import { ShieldCheck, Info, TrendingUp, ArrowDownToLine } from "lucide-react";

export function FeeBanner({
  variant = "default",
}: {
  variant?: "default" | "compact" | "withdrawal" | "sales";
}) {
  if (variant === "compact") {
    return (
      <div
        id="fee-banner-compact"
        className="rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 flex items-center gap-3 text-sm"
      >
        <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
        <span className="text-muted-foreground">
          Taxas Infropai: <b className="text-foreground">2%</b> por venda ·{" "}
          <b className="text-foreground">6%</b> por saque · Saque mínimo{" "}
          <b className="text-foreground">5.000 Kz</b>
        </span>
      </div>
    );
  }

  if (variant === "withdrawal") {
    return (
      <div
        id="fee-banner-withdrawal"
        className="rounded-2xl border border-gold/35 bg-gradient-to-r from-gold/15 via-card to-primary/10 p-5 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-gold/20 text-gold grid place-items-center shrink-0 border border-gold/30">
            <ArrowDownToLine className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30">
                TAXA DE SAQUE: 6%
              </span>
            </div>
            <div className="font-display font-semibold text-lg text-foreground">
              Saque com Transparência Total
            </div>
            <p className="text-sm text-muted-foreground">
              A Infropai aplica uma taxa fixa e transparente de{" "}
              <b className="text-foreground">6%</b> em cada levantamento. Antes de confirmar o seu
              saque, você visualiza em tempo real:{" "}
              <b className="text-foreground">Valor solicitado</b>,{" "}
              <b className="text-foreground">Taxa aplicada (6%)</b> e o{" "}
              <b className="text-foreground">Valor líquido</b> creditado na sua conta bancária.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-gold" /> Saque mínimo:{" "}
                <strong className="text-foreground">5.000 Kz</strong>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-success" /> Liberação rápida e segura
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "sales") {
    return (
      <div
        id="fee-banner-sales"
        className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-card to-gold/10 p-5 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-primary/20 text-primary-glow grid place-items-center shrink-0 border border-primary/30">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary-glow border border-primary/30">
                COMISSÃO: APENAS 2%
              </span>
            </div>
            <div className="font-display font-semibold text-lg text-foreground">
              Vendeu? A Infropai cobra apenas 2% por venda
            </div>
            <p className="text-sm text-muted-foreground">
              Fique com <b className="text-foreground">98% do valor líquido</b> dos seus produtos
              digitais. Sem mensalidades, sem taxas de adesão, sem surpresas no fim do mês.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="fee-banner-default"
      className="rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-card to-primary/10 p-5"
    >
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-xl gradient-brand grid place-items-center shrink-0">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="font-display font-semibold text-lg">Transparência total em taxas</div>
          <p className="text-sm text-muted-foreground">
            A Infropai opera com as menores taxas do mercado: apenas{" "}
            <b className="text-foreground">2% por cada venda</b> concluída e{" "}
            <b className="text-foreground">6% em cada saque</b>. Sem mensalidades ou custos ocultos.
            Saque mínimo de <b className="text-foreground">5.000 Kz</b> ·{" "}
            <b className="text-foreground">liberação em no mínimo 1 hora</b> após a aprovação do
            pagamento.
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 text-gold" /> Todos os valores calculados e exibidos em
            Kwanzas (AOA).
          </div>
        </div>
      </div>
    </div>
  );
}

export function kz(cents: number | null | undefined) {
  const v = (cents ?? 0) / 100;
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0,
  }).format(v);
}
