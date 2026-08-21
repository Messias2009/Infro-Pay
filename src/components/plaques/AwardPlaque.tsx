import React, { useRef, useState } from "react";
import {
  Award,
  Shield,
  CheckCircle2,
  Download,
  Share2,
  Lock,
  Sparkles,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Level } from "@/lib/legends.functions";
import logoMark from "@/assets/infropay-mark.png";
import { toast } from "sonner";

export interface AwardPlaqueProps {
  level: Level;
  sellerName?: string;
  milestoneText?: string;
  issuedDate?: string;
  serialNumber?: string;
  className?: string;
  showActions?: boolean;
  isUnlocked?: boolean;
  userRevenueCents?: number;
}

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
    glow: "rgba(205, 127, 50, 0.45)",
    border: "rgba(205, 127, 50, 0.7)",
    accent: "#FFA07A",
    trophyColor: "#D2691E",
    ribbonGradient: "linear-gradient(135deg, #8B4513 0%, #CD7F32 50%, #A0522D 100%)",
    badgeBg: "#1F1510",
    subtitle: "Iniciação de Vendas",
  },
  prata: {
    primary: "#E0E0E0",
    secondary: "#9E9E9E",
    glow: "rgba(224, 224, 224, 0.4)",
    border: "rgba(224, 224, 224, 0.7)",
    accent: "#FFFFFF",
    trophyColor: "#C0C0C0",
    ribbonGradient: "linear-gradient(135deg, #757575 0%, #E0E0E0 50%, #BDBDBD 100%)",
    badgeBg: "#14181F",
    subtitle: "Marca dos 100 Mil Kz",
  },
  ouro: {
    primary: "#FFD700",
    secondary: "#B8860B",
    glow: "rgba(255, 215, 0, 0.55)",
    border: "rgba(255, 215, 0, 0.8)",
    accent: "#FFF8DC",
    trophyColor: "#FFC107",
    ribbonGradient: "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #D4AF37 100%)",
    badgeBg: "#1D190B",
    subtitle: "Clube dos 500 Mil Kz",
  },
  platina: {
    primary: "#E5E4E2",
    secondary: "#78909C",
    glow: "rgba(229, 228, 226, 0.5)",
    border: "rgba(229, 228, 226, 0.75)",
    accent: "#FFFFFF",
    trophyColor: "#CFD8DC",
    ribbonGradient: "linear-gradient(135deg, #546E7A 0%, #ECEFF1 50%, #90A4AE 100%)",
    badgeBg: "#10161C",
    subtitle: "Clube do Milhão Kz",
  },
  diamante: {
    primary: "#00E5FF",
    secondary: "#0091EA",
    glow: "rgba(0, 229, 255, 0.6)",
    border: "rgba(0, 229, 255, 0.85)",
    accent: "#E0F7FA",
    trophyColor: "#29B6F6",
    ribbonGradient: "linear-gradient(135deg, #01579B 0%, #00E5FF 50%, #0288D1 100%)",
    badgeBg: "#061826",
    subtitle: "Marca dos 5 Milhões Kz",
  },
  mestre: {
    primary: "#E040FB",
    secondary: "#7B1FA2",
    glow: "rgba(224, 64, 251, 0.55)",
    border: "rgba(224, 64, 251, 0.8)",
    accent: "#F3E5F5",
    trophyColor: "#AB47BC",
    ribbonGradient: "linear-gradient(135deg, #4A148C 0%, #E040FB 50%, #8E24AA 100%)",
    badgeBg: "#180A24",
    subtitle: "Mestre dos 10 Milhões Kz",
  },
  elite: {
    primary: "#FF1744",
    secondary: "#C2185B",
    glow: "rgba(255, 23, 68, 0.55)",
    border: "rgba(255, 23, 68, 0.8)",
    accent: "#FFEBEE",
    trophyColor: "#FF5252",
    ribbonGradient: "linear-gradient(135deg, #880E4F 0%, #FF1744 50%, #C2185B 100%)",
    badgeBg: "#220810",
    subtitle: "Elite dos 25 Milhões Kz",
  },
  lenda: {
    primary: "#00E676",
    secondary: "#00897B",
    glow: "rgba(0, 230, 118, 0.6)",
    border: "rgba(0, 230, 118, 0.85)",
    accent: "#E8F5E9",
    trophyColor: "#26A69A",
    ribbonGradient: "linear-gradient(135deg, #004D40 0%, #00E676 50%, #00897B 100%)",
    badgeBg: "#051C14",
    subtitle: "Lenda dos 50 Milhões Kz",
  },
  imortal: {
    primary: "#FFAB00",
    secondary: "#FF6D00",
    glow: "rgba(255, 171, 0, 0.6)",
    border: "rgba(255, 171, 0, 0.85)",
    accent: "#FFF8E1",
    trophyColor: "#FF9100",
    ribbonGradient: "linear-gradient(135deg, #E65100 0%, #FFD600 50%, #FF9100 100%)",
    badgeBg: "#241604",
    subtitle: "Imortal dos 100 Milhões Kz",
  },
  infinito: {
    primary: "#7C4DFF",
    secondary: "#304FFE",
    glow: "rgba(124, 77, 255, 0.7)",
    border: "rgba(124, 77, 255, 0.9)",
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
  isUnlocked,
  userRevenueCents,
}: AwardPlaqueProps) {
  const plaqueRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const theme = PLAQUE_THEMES[level.key] || PLAQUE_THEMES.ouro;

  // Strict check: if isUnlocked is explicitly passed, respect it; otherwise evaluate against revenue
  const unlocked =
    isUnlocked !== undefined
      ? isUnlocked
      : userRevenueCents !== undefined
        ? userRevenueCents >= level.min_cents
        : false;

  const dateStr =
    issuedDate || new Date().toLocaleDateString("pt-AO", { month: "long", year: "numeric" });
  const serial =
    serialNumber ||
    `INFR-${level.key.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const displayMilestone =
    milestoneText || `Faturamento Superior a ${(level.min_cents / 100).toLocaleString("pt-AO")} Kz`;

  // Download high-res certificate / plaque
  const handleDownload = async () => {
    if (!unlocked) {
      toast.error("Acesso bloqueado: Atinja a meta oficial para liberar o download da placa.");
      return;
    }
    setDownloading(true);
    try {
      // Create offscreen canvas for crisp 1200x1200 export
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1200;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Deep luxury dark background
        const grad = ctx.createRadialGradient(600, 400, 50, 600, 600, 800);
        grad.addColorStop(0, "#0D1424");
        grad.addColorStop(0.7, "#050912");
        grad.addColorStop(1, "#020408");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1200, 1200);

        // Luxury metallic outer border
        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = 14;
        ctx.strokeRect(40, 40, 1120, 1120);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 2;
        ctx.strokeRect(65, 65, 1070, 1070);

        // Header Brand
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 36px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("INFROPAY OFFICIAL AWARD", 600, 140);

        ctx.fillStyle = theme.primary;
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("PLACA DE RECONHECIMENTO DE VENDAS", 600, 185);

        // Level Medal Circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(600, 420, 150, 0, Math.PI * 2);
        ctx.fillStyle = "#0B111E";
        ctx.fill();
        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = 10;
        ctx.shadowColor = theme.glow;
        ctx.shadowBlur = 40;
        ctx.stroke();
        ctx.restore();

        // Level Name & Trophy Text
        ctx.fillStyle = theme.primary;
        ctx.font = "bold 38px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🏆", 600, 400);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 48px sans-serif";
        ctx.fillText(level.name.toUpperCase(), 600, 470);

        // Plaque description
        ctx.fillStyle = theme.accent;
        ctx.font = "bold 28px sans-serif";
        ctx.fillText(theme.subtitle.toUpperCase(), 600, 640);

        // Seller Box
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        ctx.fillRect(150, 700, 900, 320);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.strokeRect(150, 700, 900, 320);

        ctx.fillStyle = "#94A3B8";
        ctx.font = "600 22px sans-serif";
        ctx.fillText("CONCEDIDO OFICIALMENTE A", 600, 750);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 44px sans-serif";
        ctx.fillText(sellerName, 600, 815);

        ctx.fillStyle = theme.primary;
        ctx.font = "bold 30px sans-serif";
        ctx.fillText(`✓ ${displayMilestone}`, 600, 875);

        ctx.fillStyle = "#64748B";
        ctx.font = "18px monospace";
        ctx.fillText(`AUTENTICIDADE: ${serial} · EMISSÃO: ${dateStr}`, 600, 960);

        // Watermark Footer
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "16px sans-serif";
        ctx.fillText("InfroPay Technologies Angola · Certificação Digital Oficial", 600, 1100);

        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `InfroPay_Placa_${level.name}_${sellerName.replace(/\s+/g, "_")}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Placa oficial gerada e transferida em alta resolução!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao gerar a imagem da placa.");
    } finally {
      setDownloading(false);
    }
  };

  // Share plaque to social / WhatsApp
  const handleShare = async () => {
    if (!unlocked) {
      toast.error("Acesso bloqueado: Atinja a meta de vendas para partilhar a placa oficial.");
      return;
    }
    const shareData = {
      title: `Placa Oficial ${level.name} — InfroPay`,
      text: `Conquistei a Placa Oficial ${level.name} na InfroPay com ${displayMilestone}! 🚀🏆`,
      url: window.location.origin + "/legends",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Placa partilhada!");
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      toast.success("Link e mensagem copiados para partilha!");
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 w-full min-w-0 max-w-full ${className}`}>
      {/* 1080 x 1080 Luxury Plaque Container */}
      <div
        ref={plaqueRef}
        id={`plaque-${level.key}`}
        className="relative w-full aspect-square max-w-[480px] sm:max-w-[520px] rounded-3xl overflow-hidden shadow-2xl transition-all select-none border"
        style={{
          backgroundColor: "#050811",
          borderColor: theme.border,
          boxShadow: unlocked
            ? `0 25px 60px -15px ${theme.glow}, 0 0 0 1px ${theme.border}`
            : "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* Background Ambient Radial Glows */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${theme.primary} 1.2px, transparent 1.2px), radial-gradient(#2563EB 1.2px, transparent 1.2px)`,
            backgroundSize: "28px 28px",
            backgroundPosition: "0 0, 14px 14px",
          }}
        />

        <div
          className="absolute -top-28 -left-28 w-72 h-72 rounded-full blur-[90px] pointer-events-none opacity-40"
          style={{ backgroundColor: theme.primary }}
        />
        <div
          className="absolute -bottom-28 -right-28 w-72 h-72 rounded-full blur-[90px] pointer-events-none opacity-30"
          style={{ backgroundColor: "#2563EB" }}
        />

        {/* Outer Luxury Metallic Bevel Border */}
        <div
          className="absolute inset-3 sm:inset-4 rounded-2xl pointer-events-none border"
          style={{ borderColor: theme.border }}
        />

        {/* Corner Metallic Brackets */}
        <div
          className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 pointer-events-none"
          style={{ borderColor: theme.primary }}
        />
        <div
          className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 pointer-events-none"
          style={{ borderColor: "#3B82F6" }}
        />
        <div
          className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 pointer-events-none"
          style={{ borderColor: "#3B82F6" }}
        />
        <div
          className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 pointer-events-none"
          style={{ borderColor: theme.primary }}
        />

        {/* Plaque Content Structure */}
        <div className="relative h-full w-full p-6 sm:p-8 flex flex-col justify-between items-center text-center">
          {/* Top Brand Header */}
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <img src={logoMark} alt="InfroPay" className="h-5 w-5 object-contain" />
              <span className="font-bold tracking-tight text-white text-xs sm:text-sm">
                Infro<span style={{ color: theme.primary }}>Pay</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Shield className="h-3 w-3" style={{ color: theme.primary }} />
              <span>Placa Oficial</span>
            </div>
          </div>

          {/* Central Trophy Medallion */}
          <div className="my-auto flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div
                className={`absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full blur-2xl pointer-events-none ${
                  unlocked ? "opacity-60 animate-pulse" : "opacity-20"
                }`}
                style={{ backgroundColor: theme.glow }}
              />

              {/* Medallion Metallic Rim */}
              <div
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center p-1 shadow-2xl border-2"
                style={{
                  background: `linear-gradient(135deg, #0B111E 0%, ${theme.badgeBg} 100%)`,
                  borderColor: theme.primary,
                  boxShadow: unlocked ? `0 0 35px ${theme.glow}` : "none",
                }}
              >
                <div className="w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                  <Award
                    className="w-10 h-10 sm:w-16 sm:h-16 drop-shadow-lg transition-transform duration-500"
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
            <div className="mt-3">
              <div
                className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ color: theme.primary }}
              >
                {theme.subtitle}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-md mt-0.5">
                NÍVEL {level.name.toUpperCase()}
              </h2>
            </div>
          </div>

          {/* Seller Recipient Certificate Section */}
          <div
            className="w-full rounded-xl p-3.5 sm:p-4 border relative overflow-hidden backdrop-blur-md"
            style={{
              backgroundColor: "rgba(11, 17, 30, 0.88)",
              borderColor: "rgba(255, 255, 255, 0.12)",
            }}
          >
            <div className="text-[9px] uppercase font-semibold text-muted-foreground tracking-wider">
              Concedido a
            </div>
            <div className="text-sm sm:text-lg font-bold text-white tracking-tight truncate mt-0.5">
              {sellerName}
            </div>

            <div
              className="mt-1 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5"
              style={{ color: theme.primary }}
            >
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{displayMilestone}</span>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[9px] text-muted-foreground font-mono">
              <div className="flex items-center gap-1 text-emerald-400">
                <Sparkles className="h-2.5 w-2.5" />
                <span>Autenticado</span>
              </div>
              <div>{dateStr}</div>
              <div className="opacity-75">{serial}</div>
            </div>
          </div>

          {/* Frosted Glass Lock Overlay when user hasn't beaten the milestone */}
          {!unlocked && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="h-14 w-14 rounded-2xl bg-gold/15 border border-gold/40 grid place-items-center mb-3 shadow-lg shadow-gold/10">
                <Lock className="h-7 w-7 text-gold" />
              </div>
              <div className="font-display text-lg sm:text-xl font-bold text-foreground">
                Placa Bloqueada
              </div>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
                Atinja a meta de faturamento de{" "}
                <strong className="text-foreground">
                  {(level.min_cents / 100).toLocaleString("pt-AO")} Kz
                </strong>{" "}
                para desbloquear o download e a partilha oficial.
              </p>
              <div className="mt-3 px-3 py-1 rounded-full bg-muted/60 border border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                🔒 Rigor & Exclusividade InfroPay
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons & Security Status */}
      {showActions && (
        <div className="w-full flex flex-col items-center gap-2.5 max-w-md">
          {unlocked ? (
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
              <Button
                size="sm"
                variant="outline"
                disabled={downloading}
                onClick={handleDownload}
                className="text-xs gap-1.5 flex-1 min-w-[140px] border-gold/40 text-foreground hover:bg-gold/10"
              >
                {downloading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Download className="h-3.5 w-3.5 text-gold" />
                )}
                Baixar Placa HD (PNG)
              </Button>
              <Button
                size="sm"
                onClick={handleShare}
                className="gradient-brand text-primary-foreground text-xs gap-1.5 flex-1 min-w-[140px] shadow-glow"
              >
                <Share2 className="h-3.5 w-3.5" /> Partilhar Conquista
              </Button>
            </div>
          ) : (
            <div className="w-full p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
              <span>Download e partilha bloqueados até atingir a meta oficial de faturamento.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
