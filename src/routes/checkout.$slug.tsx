import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Zap,
  CheckCircle2,
  Gift,
  BadgeCheck,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getProductBySlug } from "@/lib/catalog.functions";
import { createOrder } from "@/lib/checkout.functions";
import { getCheckoutOffers } from "@/lib/funnel.functions";
import { getRef } from "@/lib/affiliate-ref";
import { getProductTracking } from "@/lib/tracking.functions";
import { TrackingScripts } from "@/components/TrackingScripts";
import { useQuery } from "@tanstack/react-query";
import logoImg from "@/assets/infropay-logo.png";
import markImg from "@/assets/infropay-mark.png";

const opt = (slug: string) =>
  queryOptions({
    queryKey: ["product-checkout", slug],
    queryFn: () => getProductBySlug({ data: { slug } }),
  });

function CheckoutErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const r = useRouter();
  return (
    <SiteLayout variant="checkout">
      <div className="mx-auto max-w-md p-10 text-center">
        <p className="text-destructive text-sm mb-4">{(error as Error).message}</p>
        <Button
          onClick={() => {
            reset();
            r.invalidate();
          }}
        >
          Tentar novamente
        </Button>
      </div>
    </SiteLayout>
  );
}

export const Route = createFileRoute("/checkout/$slug")({
  loader: async ({ context, params }) => {
    const d = await context.queryClient.ensureQueryData(opt(params.slug));
    if (!d) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Checkout Seguro — InfroPay" },
      { name: "description", content: "Finalize a sua compra com segurança na InfroPay." },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: CheckoutErrorComponent,
  notFoundComponent: () => (
    <SiteLayout variant="checkout">
      <div className="p-10 text-center">Produto indisponível.</div>
    </SiteLayout>
  ),
  component: Checkout,
});

const METHODS = [
  {
    id: "multicaixa_express",
    label: "Multicaixa Express",
    badge: "Recomendado · Instantâneo",
    desc: "Confirmação e liberação automática via app Multicaixa Express",
    icon: Smartphone,
    color: "text-primary",
  },
  {
    id: "referencia",
    label: "Referência Multicaixa",
    badge: "ATM / Multicaixa",
    desc: "Pague em qualquer Caixa Automático (ATM) ou Internet Banking",
    icon: CreditCard,
    color: "text-gold",
  },
  {
    id: "transferencia",
    label: "Transferência Bancária",
    badge: "IBAN Direto",
    desc: "Transferência interbancária com envio simples de comprovativo",
    icon: Building2,
    color: "text-emerald-500",
  },
] as const;

function fmt(c: number, cur: string) {
  try {
    return new Intl.NumberFormat("pt-PT", { style: "currency", currency: cur }).format(c / 100);
  } catch {
    return `${cur} ${(c / 100).toFixed(2)}`;
  }
}

function Checkout() {
  const { slug } = Route.useParams();
  const router = useRouter();
  const { data: p } = useSuspenseQuery(opt(slug));

  const { data: tracking } = useQuery({
    queryKey: ["tracking", "product", slug],
    queryFn: () => getProductTracking({ data: { slug } }),
    staleTime: 5 * 60_000,
  });

  // Query Order Bumps for this product
  const { data: offers } = useQuery({
    queryKey: ["checkout-offers", p?.id],
    queryFn: () =>
      p?.id ? getCheckoutOffers({ data: { product_id: p.id } }) : Promise.resolve([]),
    enabled: !!p?.id,
    staleTime: 5 * 60_000,
  });

  const orderBump = useMemo(() => {
    if (!offers || !Array.isArray(offers)) return null;
    return offers.find((o: any) => o.kind === "order_bump") ?? null;
  }, [offers]);

  const [includeBump, setIncludeBump] = useState(false);
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("multicaixa_express");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!p) return null;

  const basePrice =
    p.promo_price_cents && p.promo_price_cents < p.price_cents
      ? p.promo_price_cents
      : p.price_cents;

  const bumpPrice = includeBump && orderBump ? orderBump.offer_price_cents : 0;
  const totalPrice = basePrice + bumpPrice;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Por favor, preencha o seu nome completo.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Por favor, insira um email válido para receber o produto.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Por favor, insira o seu número de telefone.");
      return;
    }

    setLoading(true);
    try {
      const urlRef =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("ref")
          : null;
      const ref = urlRef ?? getRef(slug);

      const res = await createOrder({
        data: {
          product_slug: slug,
          buyer_name: name.trim(),
          buyer_email: email.trim(),
          buyer_phone: phone.trim(),
          payment_method: method,
          ref,
          order_bump_offer_id: includeBump && orderBump ? orderBump.id : null,
        },
      });

      toast.success("Pedido criado com sucesso! Prossiga com o pagamento.");
      router.navigate({ to: "/pedido/$token", params: { token: res.token } });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout variant="checkout">
      <TrackingScripts
        config={tracking}
        event={{
          type: "InitiateCheckout",
          id: p.id,
          name: p.title,
          value: totalPrice / 100,
          currency: p.currency,
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-3.5 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* TOP BAR / LOGO & NAVIGATION */}
        <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-border/60 w-full flex-wrap sm:flex-nowrap">
          <Link
            to="/produto/$slug"
            params={{ slug }}
            className="inline-flex items-center text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5 shrink-0" /> Voltar aos detalhes
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <img
              src={logoImg}
              alt="InfroPay"
              className="h-7 w-auto object-contain hidden sm:block"
            />
            <img src={markImg} alt="InfroPay" className="h-7 w-7 object-contain sm:hidden" />
            <span className="hidden md:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 pl-2 border-l border-border">
              <Lock className="h-3.5 w-3.5 text-gold shrink-0" /> Checkout 100% Seguro
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start w-full min-w-0">
          {/* LEFT COLUMN: BUYER FORM, PAYMENT METHOD & ORDER BUMP */}
          <form
            onSubmit={submit}
            className="w-full min-w-0 rounded-2xl border border-border bg-card p-3.5 sm:p-6 md:p-8 space-y-6 sm:space-y-8 shadow-card overflow-hidden"
          >
            {/* PRODUCT HERO / HEADER CARD */}
            <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/40 border border-border/60 w-full min-w-0 items-center">
              <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-gold/10 shrink-0 border border-border/60">
                {p.cover_url ? (
                  <img src={p.cover_url} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-xs font-semibold text-muted-foreground">
                    Produto
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                    <BadgeCheck className="h-3.5 w-3.5 text-gold shrink-0" /> Produto Digital
                    Oficial
                  </div>
                  <h1 className="text-base sm:text-lg font-bold line-clamp-2 text-foreground break-words">
                    {p.title}
                  </h1>
                </div>
                <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-extrabold text-gradient-gold">
                    {fmt(basePrice, p.currency)}
                  </span>
                  {p.promo_price_cents && p.promo_price_cents < p.price_cents && (
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      {fmt(p.price_cents, p.currency)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 1: BUYER INFORMATION */}
            <section className="space-y-4 w-full min-w-0">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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

            {/* SECTION 2: PAYMENT METHOD */}
            <section className="space-y-4 w-full min-w-0">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <span className="h-6 w-6 rounded-full gradient-brand text-primary-foreground text-xs font-bold grid place-items-center shrink-0">
                  2
                </span>
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                  Método de pagamento
                </h2>
              </div>

              <div className="grid gap-3 w-full min-w-0">
                {METHODS.map((m) => {
                  const Icon = m.icon;
                  const active = method === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`relative flex items-start sm:items-center gap-3 sm:gap-4 rounded-xl border p-3.5 sm:p-4 text-left transition-all w-full cursor-pointer min-w-0 ${
                        active
                          ? "border-primary bg-primary/10 shadow-glow ring-1 ring-primary/40"
                          : "border-border/80 bg-background/50 hover:border-primary/40 hover:bg-secondary/30"
                      }`}
                    >
                      <div
                        className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl grid place-items-center shrink-0 ${
                          active
                            ? "gradient-brand text-primary-foreground shadow-md"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
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
                        {active && <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: ORDER BUMP (SE EXISTIR OFERTA COMPLEMENTAR) */}
            {orderBump && (
              <section className="animate-fade-in w-full min-w-0">
                <div
                  onClick={() => setIncludeBump((prev) => !prev)}
                  className={`cursor-pointer rounded-2xl border-2 transition-all p-3.5 sm:p-5 w-full min-w-0 ${
                    includeBump
                      ? "border-gold bg-gold/10 shadow-glow"
                      : "border-gold/50 bg-gold/5 hover:border-gold hover:bg-gold/10"
                  }`}
                >
                  {/* Top Badge & Header */}
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gold/20 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeBump}
                        onChange={(e) => setIncludeBump(e.target.checked)}
                        className="h-5 w-5 rounded border-gold/60 text-gold focus:ring-gold accent-gold shrink-0 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {orderBump.headline || `Adicionar oferta exclusiva complementar`}
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
                        + {fmt(orderBump.offer_price_cents, p.currency)}
                      </div>

                      {orderBump.description && (
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {orderBump.description}
                        </p>
                      )}

                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold">
                        <Gift className="h-4 w-4 shrink-0" />
                        {includeBump
                          ? "✓ Oferta especial incluída no pedido"
                          : "Clique para adicionar ao seu pedido"}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SUBMIT BUTTON */}
            <div className="space-y-3 pt-2 w-full min-w-0">
              <Button
                disabled={loading}
                size="lg"
                type="submit"
                className="w-full min-h-12 sm:min-h-14 py-3 px-4 gradient-brand text-primary-foreground shadow-glow text-sm sm:text-base md:text-lg font-bold transition-all hover:scale-[1.005] active:scale-[0.99] cursor-pointer whitespace-normal break-words text-center leading-tight flex items-center justify-center"
              >
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0 inline" />
                <span>
                  {loading
                    ? "A processar pedido..."
                    : `Pagar ${fmt(totalPrice, p.currency)} — Finalizar Compra`}
                </span>
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground text-center">
                <span className="flex items-center gap-1 text-success font-medium">
                  <ShieldCheck className="h-4 w-4 shrink-0" /> Compra 100% Segura
                </span>
                <span>·</span>
                <span>Criptografia SSL 256 bits</span>
                <span>·</span>
                <span>Entrega imediata</span>
              </div>

              <div className="pt-2 text-center text-xs text-muted-foreground border-t border-border/40 leading-relaxed">
                Ao clicar em finalizar compra, você declara que leu e concorda com os nossos{" "}
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
              </div>
            </div>
          </form>

          {/* RIGHT COLUMN: ORDER SUMMARY & PRODUCT BENEFITS */}
          <aside className="space-y-6 lg:sticky lg:top-24 w-full min-w-0">
            {/* RESUMO DO PEDIDO */}
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card w-full min-w-0 overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold">
                  Resumo do pedido
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {includeBump ? "2 itens" : "1 item"}
                </span>
              </div>

              {/* MAIN PRODUCT ROW */}
              <div className="flex gap-3 pb-4 border-b border-border/50 items-center w-full min-w-0">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden bg-secondary shrink-0 border border-border/50">
                  {p.cover_url ? (
                    <img src={p.cover_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-xs text-muted-foreground">
                      Produto
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm sm:text-base line-clamp-2 text-foreground break-words">
                    {p.title}
                  </div>
                  <div className="text-sm font-bold text-foreground mt-1">
                    {fmt(basePrice, p.currency)}
                  </div>
                </div>
              </div>

              {/* ORDER BUMP ROW (IF SELECTED) */}
              {includeBump && orderBump && (
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
                      + {fmt(orderBump.offer_price_cents, p.currency)}
                    </div>
                  </div>
                </div>
              )}

              {/* PRICE CALCULATIONS */}
              <div className="mt-4 space-y-2.5 text-sm sm:text-base w-full min-w-0">
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Produto principal</span>
                  <span className="font-medium text-foreground">{fmt(basePrice, p.currency)}</span>
                </div>

                {includeBump && orderBump && (
                  <div className="flex justify-between text-gold text-sm font-medium">
                    <span>Oferta adicional</span>
                    <span>+{fmt(orderBump.offer_price_cents, p.currency)}</span>
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
                    {fmt(totalPrice, p.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* BENEFÍCIOS & GARANTIA */}
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-4 shadow-card w-full min-w-0">
              <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Garantia e Segurança
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-success/10 grid place-items-center shrink-0">
                    <ShieldCheck className="h-4 w-4 text-success shrink-0" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-foreground">
                      Garantia incondicional de {p.guarantee_days ?? 7} dias
                    </div>
                    <div className="text-muted-foreground mt-0.5 leading-relaxed">
                      Satisfação garantida ou seu dinheiro de volta sem complicações.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gold/10 grid place-items-center shrink-0">
                    <Zap className="h-4 w-4 text-gold shrink-0" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-foreground">Acesso Imediato</div>
                    <div className="text-muted-foreground mt-0.5 leading-relaxed">
                      Receba o link de download e instruções logo após a confirmação.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                    <Lock className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-foreground">Dados 100% Protegidos</div>
                    <div className="text-muted-foreground mt-0.5 leading-relaxed">
                      Processamento encriptado e seguro pela infraestrutura InfroPay.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
