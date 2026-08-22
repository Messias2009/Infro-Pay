import React from "react";
import { ShieldCheck, CheckCircle2, Lock } from "lucide-react";

/**
 * Logotipo oficial do Multicaixa Express (Imagem 1)
 */
export function MulticaixaExpressLogo({
  className = "h-8 w-8",
  rounded = "rounded-xl",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FF7900] to-[#E65C00] shadow-sm shrink-0 select-none ${rounded} ${className}`}
      title="Multicaixa Express"
      aria-label="Multicaixa Express"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full p-1.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100, 75)">
          {/* 8 Flower Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle})`}>
              <path
                d="M -12,-20 L -8,-42 L 8,-42 L 12,-20 Z"
                fill="#B71C1C"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M 0,-40 L 0,-22"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          ))}
          {/* Central Flower Core */}
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="11" fill="#FF7900" />
        </g>

        {/* 'express' Text */}
        <text
          x="100"
          y="164"
          textAnchor="middle"
          fill="#8B0000"
          fontSize="36"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-1px"
        >
          express
        </text>
      </svg>
    </div>
  );
}

/**
 * Logotipo oficial do Multicaixa (Pagamento por Referência - Imagem 2)
 */
export function MulticaixaLogo({
  className = "h-8 w-8",
  rounded = "rounded-xl",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-[#002744] shadow-sm shrink-0 select-none ${rounded} ${className}`}
      title="Multicaixa"
      aria-label="Multicaixa"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full p-1.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100, 78)">
          {/* 8 Golden Petals with Red Core */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle})`}>
              <path
                d="M -13,-18 L -9,-42 L 9,-42 L 13,-18 Z"
                fill="#C62828"
                stroke="#FFB800"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <path
                d="M -5,-38 L -5,-22"
                stroke="#FFB800"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ))}
          {/* Center */}
          <circle cx="0" cy="0" r="16" fill="#FFB800" />
          <circle cx="0" cy="0" r="10" fill="#002744" />
        </g>

        {/* 'multicaixa' Text */}
        <text
          x="100"
          y="166"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="24"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1px"
        >
          multicaixa
        </text>
      </svg>
    </div>
  );
}

/**
 * Logotipo oficial da EMIS - Empresa Interbancária de Serviços S.A. (Imagem 3)
 */
export function EmisLogo({
  className = "h-7 w-auto",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const textColor = inverted ? "#FFFFFF" : "#002855";

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      title="EMIS - Empresa Interbancária de Serviços"
      aria-label="EMIS"
    >
      <svg
        viewBox="0 0 240 70"
        className="w-full h-full object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Orange Card Icon */}
        <g transform="skewX(-15) translate(20, 10)">
          <rect
            x="0"
            y="0"
            width="52"
            height="46"
            rx="9"
            fill="#FF6E00"
          />
          {/* Card cutout stripe */}
          <path
            d="M 12,22 L 40,22"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>

        {/* 'emis' Wordmark */}
        <text
          x="95"
          y="48"
          fill={textColor}
          fontSize="46"
          fontWeight="900"
          fontStyle="italic"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-1px"
        >
          emis
        </text>
      </svg>
    </div>
  );
}

/**
 * Selo de Confiança e Pagamento Verificado pela EMIS (Angola)
 */
export function EmisVerifiedBadge({
  variant = "card",
  className = "",
}: {
  variant?: "card" | "pill" | "compact" | "banner";
  className?: string;
}) {
  if (variant === "pill") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-foreground ${className}`}
      >
        <div className="flex items-center gap-1.5">
          <EmisLogo className="h-4 w-auto" />
          <span className="text-orange-500 font-bold">EMIS</span>
        </div>
        <span className="text-border">|</span>
        <span className="inline-flex items-center gap-1 text-muted-foreground text-[11px]">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          Pagamentos Verificados
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`flex items-center gap-2.5 rounded-xl border border-border/80 bg-secondary/30 p-2.5 text-xs text-muted-foreground ${className}`}
      >
        <div className="flex items-center gap-1.5 shrink-0 bg-background/80 px-2 py-1 rounded-lg border border-border/60">
          <EmisLogo className="h-4 w-auto" />
        </div>
        <div className="min-w-0 flex-1 leading-tight text-[11px]">
          <span className="font-bold text-foreground">Assegurado pela EMIS</span>
          <span className="block text-muted-foreground mt-0.5">
            Rede interbancária oficial de Angola
          </span>
        </div>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={`rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-card to-secondary/40 p-3.5 sm:p-4 text-left ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500/15 border border-orange-500/30 grid place-items-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-xs sm:text-sm text-foreground">
                  Pagamentos 100% Verificados e Seguros
                </span>
                <span className="rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/20">
                  Rede Oficial EMIS
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Transações processadas e asseguradas pela <strong>EMIS</strong> (Empresa
                Interbancária de Serviços S.A.).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center bg-card/80 p-1.5 rounded-xl border border-border/80 shrink-0">
            <MulticaixaExpressLogo className="h-6 w-6" rounded="rounded-md" />
            <MulticaixaLogo className="h-6 w-6" rounded="rounded-md" />
            <div className="pl-1 border-l border-border/80">
              <EmisLogo className="h-5 w-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Card Variant
  return (
    <div
      className={`rounded-xl border border-border/80 bg-secondary/30 p-3 sm:p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-border/60">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span className="font-bold text-xs sm:text-sm text-foreground">
            Pagamentos Verificados
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <MulticaixaExpressLogo className="h-5 w-5" rounded="rounded-md" />
          <MulticaixaLogo className="h-5 w-5" rounded="rounded-md" />
          <EmisLogo className="h-4 w-auto pl-1" />
        </div>
      </div>
      <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 leading-relaxed">
        Todas as operações em Kwanza (AOA) via Multicaixa Express e Referência são processadas de
        forma encriptada e asseguradas pela <strong>EMIS</strong> — Empresa Interbancária de
        Serviços S.A.
      </p>
    </div>
  );
}

/**
 * Barra de Métodos de Pagamento e Selos
 */
export function PaymentMethodsBadgesRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-2.5 py-1 text-xs font-semibold shadow-xs">
        <MulticaixaExpressLogo className="h-5 w-5" rounded="rounded-md" />
        <span className="text-foreground">Multicaixa Express</span>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-2.5 py-1 text-xs font-semibold shadow-xs">
        <MulticaixaLogo className="h-5 w-5" rounded="rounded-md" />
        <span className="text-foreground">Referência Multicaixa</span>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-lg border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold shadow-xs text-foreground">
        <EmisLogo className="h-4 w-auto" />
        <span className="text-[11px] text-orange-500 font-bold">Verificado EMIS</span>
      </div>
    </div>
  );
}
