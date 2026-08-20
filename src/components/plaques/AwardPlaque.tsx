import React, { useRef } from "react";
import { Award, Shield, CheckCircle2, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Level, LEVELS } from "@/lib/legends.functions";
import logoMark from "@/assets/infropay-mark.png";

export interface AwardPlaqueProps {
  level: Level;
  sellerName?: string;
  milestoneText?: string;
  issuedDate?: string;
  serialNumber?: string;
  className?: string;
  showActions?: boolean;
}

// Visual color schemes and metallic accents for each of the registered 10 levels
export const PLAQUE_THEMES: Record<
  string,
  {
    primary: string;
    secondary: string;
    glow: string;
    border: string;
    accent: string;
    trophyColor: string;
    ribbonGradient: string;
    badgeBg: string;
    subtitle: string;
  }
> = {
  bronze: {
    primary: "#CD7F32",
    secondary: "#8B4513",
    glow: "rgba(205, 127, 50, 0.4)",
    border: "rgba(205, 127, 50, 0.6)",
    accent: "#FFA07A",
    trophyColor: "#D2691E",
    ribbonGradient: "linear-gradient(135deg, #8B4513 0%, #CD7F32 50%, #A0522D 100%)",
    badgeBg: "#1F1510",
    subtitle: "Iniciação de Vendas",
  },
  prata: {
    primary: "#E0E0E0",
    secondary: "#9E9E9E",
    glow: "rgba(224, 224, 224, 0.35)",
    border: "rgba(224, 224, 224, 0.6)",
    accent: "#FFFFFF",
    trophyColor: "#C0C0C0",
    ribbonGradient: "linear-gradient(135deg, #757575 0%, #E0E0E0 50%, #BDBDBD 100%)",
    badgeBg: "#14181F",
    subtitle: "Marca dos 100 Mil Kz",
  },
  ouro: {
    primary: "#FFD700",
    secondary: "#B8860B",
    glow: "rgba(255, 215, 0, 0.45)",
    border: "rgba(255, 215, 0, 0.7)",
    accent: "#FFF8DC",
    trophyColor: "#FFC107",
    ribbonGradient: "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #D4AF37 100%)",
    badgeBg: "#1D190B",
    subtitle: "Clube dos 500 Mil Kz",
  },
  platina: {
    primary: "#E5E4E2",
    secondary: "#78909C",
    glow: "rgba(229, 228, 226, 0.4)",
    border: "rgba(229, 228, 226, 0.65)",
    accent: "#FFFFFF",
    trophyColor: "#CFD8DC",
    ribbonGradient: "linear-gradient(135deg, #546E7A 0%, #ECEFF1 50%, #90A4AE 100%)",
    badgeBg: "#10161C",
    subtitle: "Clube do Milhão Kz",
  },
  diamante: {
    primary: "#00E5FF",
    secondary: "#0091EA",
    glow: "rgba(0, 229, 255, 0.5)",
    border: "rgba(0, 229, 255, 0.75)",
    accent: "#E0F7FA",
    trophyColor: "#29B6F6",
    ribbonGradient: "linear-gradient(135deg, #01579B 0%, #00E5FF 50%, #0288D1 100%)",
    badgeBg: "#061826",
    subtitle: "Marca dos 5 Milhões Kz",
  },
  mestre: {
    primary: "#E040FB",
    secondary: "#7B1FA2",
    glow: "rgba(224, 64, 251, 0.45)",
    border: "rgba(224, 64, 251, 0.7)",
    accent: "#F3E5F5",
    trophyColor: "#AB47BC",
    ribbonGradient: "linear-gradient(135deg, #4A148C 0%, #E040FB 50%, #8E24AA 100%)",
    badgeBg: "#180A24",
    subtitle: "Mestre dos 10 Milhões Kz",
  },
  elite: {
    primary: "#FF1744",
    secondary: "#C2185B",
    glow: "rgba(255, 23, 68, 0.45)",
    border: "rgba(255, 23, 68, 0.7)",
    accent: "#FFEBEE",
    trophyColor: "#FF5252",
    ribbonGradient: "linear-gradient(135deg, #880E4F 0%, #FF1744 50%, #C2185B 100%)",
    badgeBg: "#220810",
    subtitle: "Elite dos 25 Milhões Kz",
  },
  lenda: {
    primary: "#00E676",
    secondary: "#00897B",
    glow: "rgba(0, 230, 118, 0.5)",
    border: "rgba(0, 230, 118, 0.75)",
    accent: "#E8F5E9",
    trophyColor: "#26A69A",
    ribbonGradient: "linear-gradient(135deg, #004D40 0%, #00E676 50%, #00897B 100%)",
    badgeBg: "#051C14",
    subtitle: "Lenda dos 50 Milhões Kz",
  },
  imortal: {
    primary: "#FFAB00",
    secondary: "#FF6D00",
    glow: "rgba(255, 171, 0, 0.5)",
    border: "rgba(255, 171, 0, 0.8)",
    accent: "#FFF8E1",
    trophyColor: "#FF9100",
    ribbonGradient: "linear-gradient(135deg, #E65100 0%, #FFD600 50%, #FF9100 100%)",
    badgeBg: "#241604",
    subtitle: "Imortal dos 100 Milhões Kz",
  },
  infinito: {
    primary: "#7C4DFF",
    secondary: "#304FFE",
    glow: "rgba(124, 77, 255, 0.6)",
    border: "rgba(124, 77, 255, 0.85)",
    accent: "#EDE7F6",
    trophyColor: "#651FFF",
    ribbonGradient: "linear-gradient(135deg, #1A237E 0%, #7C4DFF 50%, #3D5AFE 100%)",
    badgeBg: "#100B2A",
    subtitle: "Nível Máximo Infinito",
  },
};

export function AwardPlaque({
  level,
  sellerName = "Produtor Oficial InfroPay",
  milestoneText,
  issuedDate,
  serialNumber,
  className = "",
  showActions = false,
}: AwardPlaqueProps) {
  const plaqueRef = useRef<HTMLDivElement>(null);
  const theme = PLAQUE_THEMES[level.key] || PLAQUE_THEMES.ouro;
  const dateStr =
    issuedDate || new Date().toLocaleDateString("pt-AO", { month: "long", year: "numeric" });
  const serial =
    serialNumber ||
    `INFR-${level.key.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const displayMilestone =
    milestoneText || `Faturamento Superior a ${(level.min_cents / 100).toLocaleString("pt-AO")} Kz`;

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* 1080 x 1080 Square Plaque Container */}
      <div
        ref={plaqueRef}
        id={`plaque-${level.key}`}
        className="relative w-full aspect-square max-w-[540px] rounded-3xl overflow-hidden shadow-2xl transition-all select-none"
        style={{
          backgroundColor: "#060A12",
          boxShadow: `0 25px 60px -15px ${theme.glow}, 0 0 0 1px ${theme.border}`,
        }}
      >
        {/* Background Subtle Geometric Pattern & Radial Glows */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${theme.primary} 1px, transparent 1px), radial-gradient(#2563EB 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            backgroundPosition: "0 0, 14px 14px",
          }}
        />

        <div
          className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{ backgroundColor: theme.primary }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30"
          style={{ backgroundColor: "#2563EB" }}
        />

        {/* Outer Luxury Metallic Bevel Border */}
        <div
          className="absolute inset-3 sm:inset-4 rounded-2xl pointer-events-none border"
          style={{ borderColor: theme.border }}
        />

        {/* Inner Corner Brackets (Gold & Electric Blue accents) */}
        <div
          className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 pointer-events-none"
          style={{ borderColor: theme.primary }}
        />
        <div
          className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 pointer-events-none"
          style={{ borderColor: "#3B82F6" }}
        />
        <div
          className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 pointer-events-none"
          style={{ borderColor: "#3B82F6" }}
        />
        <div
          className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 pointer-events-none"
          style={{ borderColor: theme.primary }}
        />

        {/* Plaque Content Container */}
        <div className="relative h-full w-full p-7 sm:p-10 flex flex-col justify-between items-center text-center">
          {/* Top Brand Header */}
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <img src={logoMark} alt="InfroPay" className="h-6 w-6 object-contain" />
              <span className="font-bold tracking-tight text-white text-xs sm:text-sm">
                Infro<span style={{ color: theme.primary }}>Pay</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Shield className="h-3 w-3" style={{ color: theme.primary }} />
              <span>Official Award</span>
            </div>
          </div>

          {/* Central Trophy / Medal Graphic Area */}
          <div className="my-auto flex flex-col items-center justify-center">
            {/* Outer Radial Halo */}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full blur-2xl opacity-60 animate-pulse pointer-events-none"
                style={{ backgroundColor: theme.glow }}
              />

              {/* Medallion Metallic Frame */}
              <div
                className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full flex items-center justify-center p-1 shadow-2xl border-2"
                style={{
                  background: `linear-gradient(135deg, #0B111E 0%, ${theme.badgeBg} 100%)`,
                  borderColor: theme.primary,
                  boxShadow: `0 0 35px ${theme.glow}`,
                }}
              >
                {/* Level Specific Trophy SVG Icon */}
                <div className="w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                  <Award
                    className="w-12 h-12 sm:w-18 sm:h-18 drop-shadow-lg transition-transform duration-500"
                    style={{ color: theme.primary }}
                  />
                  <div
                    className="absolute bottom-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-white/90 shadow-sm"
                    style={{ background: theme.ribbonGradient }}
                  >
                    {level.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Level Title */}
            <div className="mt-4">
              <div
                className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: theme.primary }}
              >
                Placa de Reconhecimento
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                NÍVEL {level.name.toUpperCase()}
              </h2>
            </div>
          </div>

          {/* RESERVED AREA (Dynamic HTML/CSS Overlay for Seller Details) */}
          <div
            className="w-full rounded-2xl p-4 sm:p-5 border relative overflow-hidden backdrop-blur-md"
            style={{
              backgroundColor: "rgba(11, 17, 30, 0.85)",
              borderColor: "rgba(255, 255, 255, 0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
              Concedido a
            </div>
            <div className="text-base sm:text-xl font-bold text-white tracking-tight truncate mt-0.5">
              {sellerName}
            </div>

            <div
              className="mt-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5"
              style={{ color: theme.primary }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{displayMilestone}</span>
            </div>

            {/* Certificate Footer Details */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-emerald-400" />
                <span>Autenticidade Verificada</span>
              </div>
              <div>{dateStr}</div>
              <div className="font-mono text-[9px] opacity-75">{serial}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional action buttons */}
      {showActions && (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              window.print();
            }}
            className="text-xs gap-1.5"
          >
            <Download className="h-3.5 w-3.5" /> Salvar Certificado
          </Button>
          <Button
            size="sm"
            className="gradient-brand text-primary-foreground text-xs gap-1.5"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: `Placa ${level.name} — InfroPay`,
                    text: `Conquistei a Placa ${level.name} na InfroPay com faturamento comprovado!`,
                    url: window.location.href,
                  })
                  .catch(() => {});
              }
            }}
          >
            <Share2 className="h-3.5 w-3.5" /> Compartilhar
          </Button>
        </div>
      )}
    </div>
  );
}
