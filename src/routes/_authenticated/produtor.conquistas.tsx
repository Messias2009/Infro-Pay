import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trophy, Lock, Flame, Rocket, Crown, Star, Medal, Award, Eye } from "lucide-react";
import { getMyAchievements } from "@/lib/profile.functions";
import { LEVELS, levelFor, type Level } from "@/lib/legends.functions";
import { kz } from "@/components/finance/FeeBanner";
import { AwardPlaque } from "@/components/plaques/AwardPlaque";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/produtor/conquistas")({
  head: () => ({
    meta: [{ title: "Conquistas & Placas — InfroPay" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

function Page() {
  const fn = useServerFn(getMyAchievements);
  const { data } = useQuery({ queryKey: ["me", "achievements"], queryFn: () => fn() });
  const revenue = data?.revenue_cents ?? 0;
  const current = levelFor(revenue);

  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-6xl mx-auto space-y-8 min-w-0 break-words">
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-semibold">
          Premiações Oficiais
        </div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-1 text-foreground">
          Conquistas & Placas
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
          A cada meta de faturamento alcançada, você desbloqueia uma placa oficial exclusiva
          InfroPay.
        </p>
      </div>

      {/* Main Active Plaque Showcase */}
      <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-card via-card/90 to-background p-6 sm:p-8 shadow-xl">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5" /> Nível Atual Conquistado
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Placa Oficial <span style={{ color: current.color }}>{current.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Você alcançou o faturamento acumulado de{" "}
              <strong className="text-foreground">{kz(revenue)}</strong> com um total de{" "}
              <strong className="text-foreground">{data?.sales_count ?? 0} vendas aprovadas</strong>
              .
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setSelectedLevel(current)}
                className="gradient-brand text-primary-foreground shadow-glow font-bold text-xs sm:text-sm"
              >
                <Eye className="h-4 w-4 mr-1.5" /> Ver Placa Digital Completa
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px]">
              <AwardPlaque
                level={current}
                milestoneText={`${kz(revenue)} Faturados`}
                showActions={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All Levels and Plaques */}
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
          Níveis de Premiação
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Clique em qualquer nível para inspecionar a placa digital correspondente.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mt-5">
          {LEVELS.map((l) => {
            const unlocked = revenue >= l.min_cents;
            return (
              <div
                key={l.key}
                onClick={() => setSelectedLevel(l)}
                className={`relative rounded-2xl border p-4 sm:p-5 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                  unlocked ? "badge-shine bg-card" : "opacity-50 bg-card/40 hover:opacity-80"
                }`}
                style={{ borderColor: l.color + "60" }}
              >
                <div
                  className={`absolute inset-0 opacity-20 ${unlocked ? "animate-bg-pan" : ""}`}
                  style={{ background: l.gradient, backgroundSize: "200% 200%" }}
                />
                <div className="relative">
                  <div
                    className={`h-12 w-12 rounded-2xl grid place-items-center mb-3 ${
                      unlocked ? "animate-floaty" : ""
                    }`}
                    style={{
                      background: l.gradient,
                      boxShadow: unlocked ? `0 8px 24px -8px ${l.color}` : "none",
                    }}
                  >
                    {unlocked ? (
                      <Trophy className="h-6 w-6 text-white drop-shadow" />
                    ) : (
                      <Lock className="h-5 w-5 text-white/80" />
                    )}
                  </div>
                  <div
                    className="font-display text-base sm:text-lg font-bold"
                    style={{ color: l.color }}
                  >
                    {l.name}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">
                    Meta: {kz(l.min_cents)}
                  </div>
                  <div
                    className="text-[9px] sm:text-[10px] mt-2 font-bold uppercase tracking-wider"
                    style={{
                      color: unlocked ? "hsl(var(--success))" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {unlocked ? "✓ DESBLOQUEADO" : "Bloqueado"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selos especiais */}
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
          Selos Especiais
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Reconhecimentos extras pelo seu desempenho na InfroPay.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-4">
          {SEALS.map((sl) => {
            const unlocked = sl.check({ revenue, sales: data?.sales_count ?? 0 });
            const Icon = sl.icon;
            return (
              <div
                key={sl.key}
                className={`relative rounded-2xl border p-4 text-center overflow-hidden ${
                  unlocked ? "badge-shine bg-card" : "opacity-40 bg-card/40"
                }`}
                style={{ borderColor: sl.color + "55" }}
              >
                <div
                  className={`h-11 w-11 mx-auto rounded-full grid place-items-center mb-2.5 ${
                    unlocked ? "animate-floaty" : ""
                  }`}
                  style={{
                    background: sl.gradient,
                    boxShadow: unlocked ? `0 8px 24px -8px ${sl.color}` : "none",
                  }}
                >
                  {unlocked ? (
                    <Icon className="h-5 w-5 text-white drop-shadow" />
                  ) : (
                    <Lock className="h-4 w-4 text-white/80" />
                  )}
                </div>
                <div
                  className="font-semibold text-xs sm:text-sm text-foreground truncate"
                  style={{ color: unlocked ? sl.color : undefined }}
                >
                  {sl.name}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 leading-snug">{sl.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Dialog to inspect Plaque */}
      {selectedLevel && (
        <Dialog open={!!selectedLevel} onOpenChange={() => setSelectedLevel(null)}>
          <DialogContent className="max-w-xl p-4 sm:p-6 bg-card border-border/80">
            <DialogHeader className="text-center pb-2">
              <DialogTitle className="text-xl font-bold text-foreground">
                Placa Oficial — Nível {selectedLevel.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Reconhecimento oficial InfroPay para produtores com faturamento superior a{" "}
                {kz(selectedLevel.min_cents)}.
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center my-2">
              <AwardPlaque
                level={selectedLevel}
                milestoneText={`Meta de ${kz(selectedLevel.min_cents)}`}
                showActions={true}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

type SealCtx = { revenue: number; sales: number };

const SEALS = [
  {
    key: "first",
    name: "Primeira venda",
    desc: "A sua primeira venda paga",
    icon: Star,
    color: "#F9A825",
    gradient: "linear-gradient(135deg,#B8860B,#FFD700)",
    check: (c: SealCtx) => c.sales >= 1,
  },
  {
    key: "ten",
    name: "10 vendas",
    desc: "10 vendas concluídas",
    icon: Medal,
    color: "#4FC3F7",
    gradient: "linear-gradient(135deg,#0277BD,#4FC3F7)",
    check: (c: SealCtx) => c.sales >= 10,
  },
  {
    key: "hundred",
    name: "100 vendas",
    desc: "100 vendas concluídas",
    icon: Flame,
    color: "#FF7043",
    gradient: "linear-gradient(135deg,#BF360C,#FF8A65)",
    check: (c: SealCtx) => c.sales >= 100,
  },
  {
    key: "million",
    name: "Milionário",
    desc: "1M Kz faturados",
    icon: Crown,
    color: "#00BCD4",
    gradient: "linear-gradient(135deg,#006064,#4DD0E1)",
    check: (c: SealCtx) => c.revenue >= 100_000_000,
  },
  {
    key: "top",
    name: "Top vendedor",
    desc: "5M Kz faturados",
    icon: Trophy,
    color: "#AB47BC",
    gradient: "linear-gradient(135deg,#6A1B9A,#CE93D8)",
    check: (c: SealCtx) => c.revenue >= 500_000_000,
  },
  {
    key: "rocket",
    name: "Escala",
    desc: "500 vendas concluídas",
    icon: Rocket,
    color: "#66BB6A",
    gradient: "linear-gradient(135deg,#1B5E20,#81C784)",
    check: (c: SealCtx) => c.sales >= 500,
  },
] as const;
