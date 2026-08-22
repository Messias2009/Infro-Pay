import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Zap,
  CheckCircle2,
  Gift,
  BadgeCheck,
  Star,
  Quote,
  Sparkles,
  Award,
  Tag,
  Check,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MulticaixaExpressLogo,
  MulticaixaLogo,
} from "@/components/ui/PaymentLogos";
import { CheckoutTimer } from "./CheckoutTimer";
import {
  renderCtaIcon,
  renderBenefitIcon,
  getCardRadiusClass,
  getButtonRadiusClass,
  getCtaStyleClasses,
} from "./checkout-utils";
import type { CheckoutCustomizationConfig } from "@/types/checkout-builder";

interface CheckoutRendererProps {
  config: CheckoutCustomizationConfig;
  product: {
    id?: string;
    title: string;
    cover_url?: string | null;
    price_cents: number;
    promo_price_cents?: number | null;
    currency: string;
    slug?: string;
    guarantee_days?: number;
    short_description?: string | null;
    description?: string | null;
  };
  orderBump?: any;
  includeBump?: boolean;
  setIncludeBump?: (v: boolean) => void;
  selectedMethod?: string;
  setSelectedMethod?: (m: string) => void;
  buyerName?: string;
  setBuyerName?: (v: string) => void;
  buyerEmail?: string;
  setBuyerEmail?: (v: string) => void;
  buyerPhone?: string;
  setBuyerPhone?: (v: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  loading?: boolean;
  isPreview?: boolean;
  onSelectElement?: (id: string) => void;
  selectedElementId?: string;
}

const ALL_PAYMENT_METHODS = [
  {
    id: "multicaixa_express",
    label: "Multicaixa Express",
    badge: "Recomendado · Instantâneo",
    desc: "Confirmação e liberação automática via app Multicaixa Express",
    type: "logo",
    logo: MulticaixaExpressLogo,
  },
  {
    id: "referencia",
    label: "Pagamento por Referência",
    badge: "ATM / Multicaixa",
    desc: "Pague em qualquer Caixa Automático (ATM) ou Internet Banking",
    type: "logo",
    logo: MulticaixaLogo,
  },
];

function fmt(c: number, cur: string) {
  try {
    return new Intl.NumberFormat("pt-PT", { style: "currency", currency: cur }).format(c / 100);
  } catch {
    return `${cur} ${(c / 100).toFixed(2)}`;
  }
}

export function CheckoutRenderer({
  config,
  product,
  orderBump,
  includeBump = false,
  setIncludeBump,
  selectedMethod,
  setSelectedMethod,
  buyerName = "",
  setBuyerName,
  buyerEmail = "",
  setBuyerEmail,
  buyerPhone = "",
  setBuyerPhone,
  onSubmit,
  loading = false,
  isPreview = false,
  onSelectElement,
  selectedElementId,
}: CheckoutRendererProps) {
  const [internalMethod, setInternalMethod] = useState(
    config.defaultPaymentMethod || "multicaixa_express",
  );
  const [internalBump, setInternalBump] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const activeMethod = selectedMethod || internalMethod;
  const setMethod = setSelectedMethod || setInternalMethod;
  const isBumpIncluded = setIncludeBump ? includeBump : internalBump;
  const toggleBump = setIncludeBump
    ? () => setIncludeBump(!includeBump)
    : () => setInternalBump(!internalBump);

  const basePrice =
    product.promo_price_cents && product.promo_price_cents < product.price_cents
      ? product.promo_price_cents
      : product.price_cents;

  const bumpPrice =
    isBumpIncluded && orderBump && config.model !== "simples" && config.showOrderBump
      ? orderBump.offer_price_cents
      : 0;

  const totalPrice = basePrice + bumpPrice;

  // Filter payment methods based on seller configuration
  const availableMethods = ALL_PAYMENT_METHODS.filter((m) => {
    if (m.id === "multicaixa_express") return config.paymentMethods.multicaixa_express !== false;
    if (m.id === "referencia") return config.paymentMethods.referencia !== false;
    if (m.id === "transferencia") return config.paymentMethods.transferencia !== false;
    return true;
  });

  const cardRadiusClass = getCardRadiusClass(config.cardRadius || "2xl");
  const buttonRadiusClass = getButtonRadiusClass(config.buttonRadius || "xl");
  const ctaClasses = getCtaStyleClasses(config.ctaStyle || "gradient");

  const isSimples = config.model === "simples";

  function handleClickSection(sectionId: string, e: React.MouseEvent) {
    if (isPreview && onSelectElement) {
      e.stopPropagation();
      onSelectElement(sectionId);
    }
  }

  function getSelectionBorder(sectionId: string) {
    if (!isPreview) return "";
    return selectedElementId === sectionId
      ? "ring-2 ring-primary ring-offset-2 ring-offset-background cursor-pointer"
      : "hover:ring-1 hover:ring-primary/40 cursor-pointer";
  }

  return (
    <div
      className={`w-full min-h-full transition-colors duration-200 ${
        config.bgTheme === "light_modern"
          ? "bg-slate-50 text-slate-900"
          : config.bgTheme === "light_minimal"
            ? "bg-white text-slate-900"
            : config.bgTheme === "dark_luxury"
              ? "bg-[#09090b] text-slate-50"
              : "bg-background text-foreground"
      }`}
      style={{
        backgroundColor: config.customBgColor || undefined,
        color: config.customTextColor || undefined,
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 py-4 sm:py-6">
        {/* 2. PROMOTIONAL OFFER BANNER (Se ativado e não for checkout simples) */}
        {!isSimples && config.showOffer && (
          <div
            onClick={(e) => handleClickSection("offer", e)}
            className={`mb-6 p-4 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 text-foreground shadow-sm ${getSelectionBorder(
              "offer",
            )}`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-gold shrink-0 animate-pulse" />
              <div>
                <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                  {config.offerHeadline || "Oferta Especial por Tempo Limitado"}
                </h3>
                {config.offerSubtitle && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {config.offerSubtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. COUNTDOWN TIMER (Se ativado e não for checkout simples) */}
        {!isSimples && config.showCountdown && (
          <div
            onClick={(e) => handleClickSection("countdown", e)}
            className={`mb-6 ${getSelectionBorder("countdown")}`}
          >
            <CheckoutTimer
              initialMinutes={config.countdownMinutes || 15}
              urgencyText={config.countdownUrgencyText || "Esta oferta especial expira em:"}
              color={config.countdownColor || "gold"}
            />
          </div>
        )}

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start w-full min-w-0">
          {/* LEFT COLUMN: FORM & SECTIONS */}
          <form
            onSubmit={onSubmit || ((e) => e.preventDefault())}
            className={`w-full min-w-0 border border-border bg-card p-3.5 sm:p-6 md:p-8 space-y-6 sm:space-y-8 shadow-card overflow-hidden ${cardRadiusClass}`}
            style={{
              backgroundColor: config.customCardBgColor || undefined,
            }}
          >
            {/* PRODUCT HERO / HEADER CARD */}
            <div
              onClick={(e) => handleClickSection("product", e)}
              className={`flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/40 border border-border/60 w-full min-w-0 items-center ${getSelectionBorder(
                "product",
              )}`}
            >
              {config.showProductImage && (
                <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-gold/10 shrink-0 border border-border/60">
                  {product.cover_url ? (
                    <img
                      src={product.cover_url}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-xs font-semibold text-muted-foreground">
                      Produto
                    </div>
                  )}
                </div>
              )}
              <div className="min-w-0 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                    <BadgeCheck className="h-3.5 w-3.5 text-gold shrink-0" /> Produto Oficial
                  </div>
                  <h1 className="text-base sm:text-lg font-bold line-clamp-2 text-foreground break-words">
                    {product.title}
                  </h1>
                </div>
                <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-extrabold text-gradient-gold">
                    {fmt(basePrice, product.currency)}
                  </span>
                  {product.promo_price_cents &&
                    product.promo_price_cents < product.price_cents && (
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">
                        {fmt(product.price_cents, product.currency)}
                      </span>
                    )}
                </div>
              </div>
            </div>

            {/* SECTION 1: DADOS DO COMPRADOR */}
            <section
              onClick={(e) => handleClickSection("buyer_data", e)}
              className={`space-y-4 w-full min-w-0 ${getSelectionBorder("buyer_data")}`}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <span className="h-6 w-6 rounded-full gradient-brand text-primary-foreground text-xs font-bold grid place-items-center shrink-0">
                  1
                </span>
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                  Dados do comprador
                </h2>
              </div>

              <div className="grid gap-4 w-full min-w-0">
                <div className="w-full">
                  <Label className="text-sm font-semibold text-foreground">Nome completo *</Label>
                  <Input
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName && setBuyerName(e.target.value)}
                    placeholder="Ex.: António Manuel Silva"
                    className="mt-1.5 h-11 sm:h-12 text-sm sm:text-base bg-background w-full"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                  <div className="w-full min-w-0">
                    <Label className="text-sm font-semibold text-foreground">
                      Email de entrega *
                    </Label>
                    <Input
                      required
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail && setBuyerEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="mt-1.5 h-11 sm:h-12 text-sm sm:text-base bg-background w-full"
                    />
                    <span className="text-xs text-muted-foreground mt-1 block">
                      O acesso ao produto será enviado para este email.
                    </span>
                  </div>
                  <div className="w-full min-w-0">
                    <Label className="text-sm font-semibold text-foreground">
                      Telefone / WhatsApp *
                    </Label>
                    <Input
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone && setBuyerPhone(e.target.value)}
                      placeholder="Ex.: +244 923 000 000"
                      className="mt-1.5 h-11 sm:h-12 text-sm sm:text-base bg-background w-full"
                    />
                    <span className="text-xs text-muted-foreground mt-1 block">
                      Para confirmação imediata da compra.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: MÉTODOS DE PAGAMENTO */}
            <section
              onClick={(e) => handleClickSection("payment_methods", e)}
              className={`space-y-4 w-full min-w-0 ${getSelectionBorder("payment_methods")}`}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <span className="h-6 w-6 rounded-full gradient-brand text-primary-foreground text-xs font-bold grid place-items-center shrink-0">
                  2
                </span>
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                  Método de pagamento
                </h2>
              </div>

              <div className="grid gap-3 w-full min-w-0">
                {availableMethods.length === 0 ? (
                  <div className="p-4 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-sm">
                    Nenhum método de pagamento selecionado nas configurações do checkout.
                  </div>
                ) : (
                  availableMethods.map((m) => {
                    const active = activeMethod === m.id;
                    const Logo = m.logo;

                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => (setMethod as (m: string) => void)(m.id)}
                        className={`relative flex items-start sm:items-center gap-3 sm:gap-4 rounded-xl border p-3.5 sm:p-4 text-left transition-all w-full cursor-pointer min-w-0 ${
                          active
                            ? "border-primary bg-primary/10 shadow-glow ring-1 ring-primary/40"
                            : "border-border/80 bg-background/50 hover:border-primary/40 hover:bg-secondary/30"
                        }`}
                      >
                        {Logo && <Logo className="h-11 w-11 shrink-0 rounded-xl" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm sm:text-base text-foreground">
                              {m.label}
                            </span>
                            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-gold border border-gold/20">
                              {m.badge}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-snug">
                            {m.desc}
                          </div>
                        </div>
                        <div
                          className={`h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 mt-0.5 sm:mt-0 ${
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          }`}
                        >
                          {active && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </section>

            {/* SECTION 3: ORDER BUMP (Se existir, ativado e NÃO for checkout simples) */}
            {!isSimples && config.showOrderBump && orderBump && (
              <section
                onClick={(e) => handleClickSection("order_bump", e)}
                className={`animate-fade-in w-full min-w-0 ${getSelectionBorder("order_bump")}`}
              >
                <div
                  onClick={toggleBump}
                  className={`cursor-pointer rounded-2xl border-2 transition-all p-3.5 sm:p-5 w-full min-w-0 ${
                    isBumpIncluded
                      ? "border-gold bg-gold/10 shadow-glow"
                      : "border-gold/50 bg-gold/5 hover:border-gold hover:bg-gold/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gold/20 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isBumpIncluded}
                        onChange={toggleBump}
                        className="h-5 w-5 rounded border-gold/60 text-gold focus:ring-gold accent-gold shrink-0 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {orderBump.headline || "Adicionar oferta exclusiva complementar"}
                      </span>
                    </div>
                    <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-gold-foreground flex items-center gap-1 shadow-sm shrink-0">
                      <Gift className="h-3.5 w-3.5 shrink-0" /> Oferta Especial
                    </span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4 w-full min-w-0">
                    {orderBump.offer?.cover_url ? (
                      <img
                        src={orderBump.offer.cover_url}
                        alt={orderBump.offer.title}
                        className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl object-cover border border-gold/30 shrink-0"
                      />
                    ) : (
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-gold/20 border border-gold/30 grid place-items-center text-xs font-bold text-gold shrink-0">
                        BUMP
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm sm:text-base text-foreground leading-snug break-words">
                        {orderBump.offer?.title || orderBump.headline}
                      </div>
                      <div className="text-sm font-extrabold text-gold mt-1">
                        + {fmt(orderBump.offer_price_cents, product.currency)}
                      </div>

                      {orderBump.description && (
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {orderBump.description}
                        </p>
                      )}

                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold">
                        <Gift className="h-4 w-4 shrink-0" />
                        {isBumpIncluded
                          ? "✓ Oferta especial incluída no pedido"
                          : "Clique para adicionar ao seu pedido"}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SUBMIT BUTTON / CTA */}
            <div
              onClick={(e) => handleClickSection("cta", e)}
              className={`space-y-3 pt-2 w-full min-w-0 ${getSelectionBorder("cta")}`}
            >
              <Button
                disabled={loading}
                size="lg"
                type="submit"
                className={`w-full min-h-12 sm:min-h-14 py-3.5 px-4 transition-all hover:scale-[1.005] active:scale-[0.99] cursor-pointer whitespace-normal break-words text-center leading-tight flex items-center justify-center ${buttonRadiusClass} ${
                  config.ctaEnabled && !isSimples
                    ? ctaClasses.container
                    : "gradient-brand text-primary-foreground shadow-glow text-base font-bold"
                }`}
                style={
                  config.ctaColor && config.ctaEnabled && !isSimples
                    ? {
                        backgroundColor: config.ctaColor,
                        color: config.ctaTextColor || "#FFFFFF",
                      }
                    : undefined
                }
              >
                {config.ctaEnabled && !isSimples ? (
                  renderCtaIcon(config.ctaIcon || "Lock", "h-5 w-5 mr-2 shrink-0")
                ) : (
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0 inline" />
                )}
                <span className="font-extrabold">
                  {loading
                    ? "A processar pedido..."
                    : config.ctaEnabled && !isSimples && config.ctaText
                      ? config.ctaText
                      : `Pagar ${fmt(totalPrice, product.currency)} — Finalizar Compra`}
                </span>
              </Button>

              {config.ctaSubtext && config.ctaEnabled && !isSimples && (
                <div className="text-center text-xs text-muted-foreground font-medium">
                  {config.ctaSubtext}
                </div>
              )}

              {/* SECURITY BULLETS */}
              {config.showSecurityBadges && (
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground text-center">
                  <span className="flex items-center gap-1 text-success font-medium">
                    <ShieldCheck className="h-4 w-4 shrink-0" /> Compra 100% Segura
                  </span>
                  <span>·</span>
                  <span>Criptografia SSL 256 bits</span>
                  <span>·</span>
                  <span>Entrega imediata</span>
                </div>
              )}

              {/* TERMS & FOOTER */}
              <div className="pt-2 text-center text-xs text-muted-foreground border-t border-border/40 leading-relaxed">
                {config.customFooterText ? (
                  <span>{config.customFooterText}</span>
                ) : (
                  <>
                    Ao clicar em finalizar compra, você declara que concorda com os nossos{" "}
                    <Link
                      to="/termos"
                      target="_blank"
                      className="text-gold underline hover:opacity-80 font-medium"
                    >
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link
                      to="/privacidade"
                      target="_blank"
                      className="text-gold underline hover:opacity-80 font-medium"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </>
                )}
              </div>
            </div>
          </form>

          {/* RIGHT COLUMN: ORDER SUMMARY, BENEFITS, TESTIMONIALS & GUARANTEE */}
          <aside className="space-y-6 lg:sticky lg:top-24 w-full min-w-0">
            {/* 1. RESUMO DO PEDIDO (Se ativado) */}
            {config.showOrderSummary && (
              <div
                onClick={(e) => handleClickSection("summary", e)}
                className={`border border-border bg-card p-4 sm:p-6 shadow-card w-full min-w-0 overflow-hidden ${cardRadiusClass} ${getSelectionBorder(
                  "summary",
                )}`}
                style={{ backgroundColor: config.customCardBgColor || undefined }}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold">
                    Resumo do pedido
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {isBumpIncluded && orderBump ? "2 itens" : "1 item"}
                  </span>
                </div>

                {/* MAIN PRODUCT */}
                <div className="flex gap-3 pb-4 border-b border-border/50 items-center w-full min-w-0">
                  {config.showProductImage && (
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden bg-secondary shrink-0 border border-border/50">
                      {product.cover_url ? (
                        <img
                          src={product.cover_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-xs text-muted-foreground">
                          Produto
                        </div>
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm sm:text-base line-clamp-2 text-foreground break-words">
                      {product.title}
                    </div>
                    <div className="text-sm font-bold text-foreground mt-1">
                      {fmt(basePrice, product.currency)}
                    </div>
                  </div>
                </div>

                {/* ORDER BUMP ROW (IF SELECTED) */}
                {isBumpIncluded && orderBump && !isSimples && config.showOrderBump && (
                  <div className="my-3 p-3 rounded-xl border border-gold/30 bg-gold/5 animate-fade-in flex gap-3 items-center w-full min-w-0">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-secondary shrink-0 border border-gold/30">
                      {orderBump.offer?.cover_url ? (
                        <img
                          src={orderBump.offer.cover_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-xs text-gold font-bold">
                          BUMP
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase text-gold block">
                        Oferta Especial
                      </span>
                      <div className="font-medium text-xs sm:text-sm truncate text-foreground">
                        {orderBump.offer?.title || orderBump.headline}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-gold mt-0.5">
                        + {fmt(orderBump.offer_price_cents, product.currency)}
                      </div>
                    </div>
                  </div>
                )}

                {/* CUPOM DE DESCONTO (Se ativado) */}
                {config.showCouponField && (
                  <div className="py-3 border-b border-border/50">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Código de cupom"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="h-9 text-xs"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (couponCode.trim()) setCouponApplied(true);
                        }}
                        className="h-9 text-xs shrink-0"
                      >
                        Aplicar
                      </Button>
                    </div>
                    {couponApplied && (
                      <span className="text-[11px] text-emerald-500 mt-1 block font-medium">
                        ✓ Cupom aplicado com sucesso!
                      </span>
                    )}
                  </div>
                )}

                {/* PRICE CALCULATIONS */}
                <div className="mt-4 space-y-2.5 text-sm sm:text-base w-full min-w-0">
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Produto principal</span>
                    <span className="font-medium text-foreground">
                      {fmt(basePrice, product.currency)}
                    </span>
                  </div>

                  {isBumpIncluded && orderBump && !isSimples && config.showOrderBump && (
                    <div className="flex justify-between text-gold text-sm font-medium">
                      <span>Oferta adicional</span>
                      <span>+{fmt(orderBump.offer_price_cents, product.currency)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Taxas de processamento</span>
                    <span className="text-success font-semibold">Grátis (0%)</span>
                  </div>

                  <div className="pt-3 border-t border-border flex justify-between items-baseline">
                    <span className="text-sm sm:text-base font-bold text-foreground">
                      Valor Total
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-gradient-gold">
                      {fmt(totalPrice, product.currency)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. BENEFÍCIOS DO PRODUTO (Se ativado e NÃO for checkout simples) */}
            {!isSimples && config.showBenefits && config.benefitsList?.length > 0 && (
              <div
                onClick={(e) => handleClickSection("benefits", e)}
                className={`border border-border bg-card p-3 sm:p-4 space-y-2.5 shadow-card w-full min-w-0 ${cardRadiusClass} ${getSelectionBorder(
                  "benefits",
                )}`}
                style={{ backgroundColor: config.customCardBgColor || undefined }}
              >
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" /> Benefícios Inclusos
                </div>

                <div className="space-y-2">
                  {config.benefitsList.map((b) => (
                    <div key={b.id} className="flex items-start gap-2.5">
                      <div className="h-6 w-6 rounded-md bg-gold/10 grid place-items-center shrink-0 mt-0.5">
                        {renderBenefitIcon(b.icon, "h-3.5 w-3.5 text-gold shrink-0")}
                      </div>
                      <div className="text-xs min-w-0">
                        <div className="font-semibold text-foreground leading-tight">{b.title}</div>
                        {b.desc && (
                          <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                            {b.desc}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. DEPOIMENTOS / PROVA SOCIAL (Se ativado e NÃO for checkout simples) */}
            {!isSimples && config.showTestimonials && config.testimonialsList?.length > 0 && (
              <div
                onClick={(e) => handleClickSection("testimonials", e)}
                className={`border border-border bg-card p-3 sm:p-4 space-y-3 shadow-card w-full min-w-0 ${cardRadiusClass} ${getSelectionBorder(
                  "testimonials",
                )}`}
                style={{ backgroundColor: config.customCardBgColor || undefined }}
              >
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-gold fill-gold shrink-0" /> Quem Comprou Recomenda
                </div>

                <div className="space-y-2.5">
                  {config.testimonialsList.map((t) => (
                    <div
                      key={t.id}
                      className="p-2.5 rounded-lg bg-secondary/40 border border-border/50 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-xs text-foreground">{t.name}</div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.rating || 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                        "{t.text}"
                      </p>
                      {t.role && (
                        <span className="text-[10px] text-muted-foreground block font-medium">
                          {t.role} {t.location ? `· ${t.location}` : ""}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. GARANTIA & SEGURANÇA */}
            {config.showGuarantee && (
              <div
                onClick={(e) => handleClickSection("guarantee", e)}
                className={`border border-border bg-card p-3 sm:p-4 space-y-2.5 shadow-card w-full min-w-0 ${cardRadiusClass} ${getSelectionBorder(
                  "guarantee",
                )}`}
                style={{ backgroundColor: config.customCardBgColor || undefined }}
              >
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Garantia e Segurança
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="h-6 w-6 rounded-md bg-success/10 grid place-items-center shrink-0 mt-0.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-success shrink-0" />
                    </div>
                    <div className="text-xs min-w-0">
                      <div className="font-semibold text-foreground leading-tight">
                        Garantia de {config.guaranteeDays ?? product.guarantee_days ?? 7} dias
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        {config.guaranteeText ||
                          "Satisfação 100% garantida ou seu dinheiro de volta sem complicações."}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="h-6 w-6 rounded-md bg-gold/10 grid place-items-center shrink-0 mt-0.5">
                      <Zap className="h-3.5 w-3.5 text-gold shrink-0" />
                    </div>
                    <div className="text-xs min-w-0">
                      <div className="font-semibold text-foreground leading-tight">Acesso Imediato</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        Receba o link de download e instruções logo após a confirmação.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="h-6 w-6 rounded-md bg-primary/10 grid place-items-center shrink-0 mt-0.5">
                      <Lock className="h-3.5 w-3.5 text-primary shrink-0" />
                    </div>
                    <div className="text-xs min-w-0">
                      <div className="font-semibold text-foreground leading-tight">Dados 100% Protegidos</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        Processamento encriptado e seguro pela infraestrutura InfroPay.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
