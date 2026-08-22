import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Star,
  Wallet,
  Trophy,
  Rocket,
} from "lucide-react";
import {
  MulticaixaExpressLogo,
  MulticaixaLogo,
  EmisLogo,
} from "@/components/ui/PaymentLogos";

const ITEMS = [
  {
    type: "logo",
    logo: MulticaixaExpressLogo,
    title: "Multicaixa Express",
    desc: "Pagamento instantâneo",
  },
  {
    type: "logo",
    logo: MulticaixaLogo,
    title: "Referência Multicaixa",
    desc: "ATM e Internet Banking",
  },
  {
    type: "emis",
    title: "Assegurado pela EMIS",
    desc: "Rede interbancária nacional",
  },
  { type: "icon", icon: ShieldCheck, title: "Compra protegida", desc: "Garantia em todas as ordens" },
  { type: "icon", icon: Zap, title: "Entrega instantânea", desc: "Acesso liberado após pagamento" },
  { type: "icon", icon: TrendingUp, title: "Alta conversão", desc: "Checkout otimizado" },
  { type: "icon", icon: Star, title: "Curadoria premium", desc: "Produtos verificados" },
  { type: "icon", icon: Wallet, title: "Saque em Kwanza", desc: "A partir de 5.000 Kz" },
  { type: "icon", icon: Trophy, title: "Placas oficiais", desc: "10 níveis de conquista" },
  { type: "icon", icon: Rocket, title: "Comissão de 2%", desc: "A menor do mercado" },
];

export function TrustMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section className="border-y border-border/60 bg-card/40 overflow-hidden">
      <div className="marquee-mask py-8">
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((item, i) => {
            return (
              <div
                key={i}
                className="flex items-start gap-3 w-[260px] shrink-0"
                aria-hidden={i >= ITEMS.length}
              >
                {item.type === "logo" && item.logo ? (
                  <item.logo className="h-10 w-10 shrink-0" rounded="rounded-lg" />
                ) : item.type === "emis" ? (
                  <div className="h-10 w-10 rounded-lg bg-orange-500/15 border border-orange-500/30 grid place-items-center shrink-0 p-1">
                    <EmisLogo className="h-5 w-auto" />
                  </div>
                ) : item.icon ? (
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary-glow" />
                  </div>
                ) : null}
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

