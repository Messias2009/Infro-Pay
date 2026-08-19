import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Copy,
  Sparkles,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getOrderByToken } from "@/lib/checkout.functions";
import { referenceForMethod } from "@/lib/payments.config";

import { getOrderTracking } from "@/lib/tracking.functions";
import { TrackingScripts } from "@/components/TrackingScripts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import logoImg from "@/assets/infropay-logo.png";

const opt = (token: string) =>
  queryOptions({
    queryKey: ["order", token],
    queryFn: () => getOrderByToken({ data: { token } }),
    refetchInterval: 12000,
  });

export const Route = createFileRoute("/pedido/$token")({
  loader: async ({ context, params }) => {
    const d = await context.queryClient.ensureQueryData(opt(params.token));
    if (!d) throw notFound();
  },
  head: () => ({
    meta: [{ title: "Status do Pedido — InfroPay" }, { name: "robots", content: "noindex" }],
  }),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-destructive text-sm">{(error as Error).message}</div>
  ),
  notFoundComponent: () => (
    <SiteLayout variant="checkout">
      <div className="p-10 text-center">Pedido não encontrado.</div>
    </SiteLayout>
  ),
  component: Pedido,
});

function fmt(c: number, cur: string) {
  try {
    return new Intl.NumberFormat("pt-PT", { style: "currency", currency: cur }).format(c / 100);
  } catch {
    return `${cur} ${(c / 100).toFixed(2)}`;
  }
}

const METHOD_LABEL: Record<string, string> = {
  multicaixa_express: "Multicaixa Express",
  referencia: "Referência Multicaixa",
  transferencia: "Transferência Bancária",
};

function Pedido() {
  const { token } = Route.useParams();
  const { data: o } = useSuspenseQuery(opt(token));
  const paid = o?.status === "pago";

  // Purchase é disparado uma única vez por pedido (guardado em localStorage).
  const [firedOnce, setFiredOnce] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setFiredOnce(window.localStorage.getItem(`ip_purchase_${token}`) === "1");
  }, [token]);

  const shouldTrack = paid && !firedOnce;
  const { data: tracking } = useQuery({
    queryKey: ["tracking", "order", token, shouldTrack],
    queryFn: () => getOrderTracking({ data: { token, notify: shouldTrack } }),
    enabled: paid,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (shouldTrack && tracking) {
      window.localStorage.setItem(`ip_purchase_${token}`, "1");
      setFiredOnce(true);
    }
  }, [shouldTrack, tracking, token]);

  if (!o) return null;
  const prod = o.product as any;
  const bumpProd = (o as any).bump_product as any;
  const payRef = referenceForMethod(o.payment_method);

  return (
    <SiteLayout variant="checkout">
      {shouldTrack && tracking && (
        <TrackingScripts
          config={tracking}
          event={{
            type: "Purchase",
            id: tracking.content_id,
            name: tracking.content_name,
            value: tracking.value,
            currency: tracking.currency,
          }}
        />
      )}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 md:py-16">
        {/* BRAND LOGO HEADER */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src={logoImg} alt="InfroPay" className="h-8 w-auto mx-auto object-contain" />
          </Link>
        </div>

        {/* STATUS BANNER */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 text-center ${
            paid
              ? "border-success/40 bg-success/10 shadow-glow"
              : "border-gold/40 bg-gold/5 shadow-card"
          }`}
        >
          <div
            className={`mx-auto h-16 w-16 rounded-full grid place-items-center ${
              paid ? "gradient-brand text-primary-foreground" : "gradient-gold text-gold-foreground"
            }`}
          >
            {paid ? (
              <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
            ) : (
              <Clock className="h-8 w-8 text-gold-foreground animate-spin-slow" />
            )}
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-foreground">
            {paid ? "Pagamento Confirmado!" : "Aguardando Pagamento"}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            {paid
              ? "O seu acesso foi liberado com sucesso. Você pode acessar seus conteúdos digitais abaixo."
              : "Assim que confirmarmos o seu pagamento na rede Multicaixa, o seu acesso será liberado automaticamente."}
          </p>
        </div>

        {/* PRODUCT DELIVERY & DETAILS */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* MAIN PRODUCT CARD */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  Produto Adquirido
                </span>
                {paid && (
                  <span className="rounded-full bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 border border-success/20">
                    Acesso Liberado
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <div className="h-16 w-16 rounded-xl overflow-hidden bg-secondary shrink-0 border border-border/60">
                  {prod?.cover_url ? (
                    <img src={prod.cover_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-[10px] text-muted-foreground">
                      Produto
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm line-clamp-2 text-foreground">
                    {prod?.title}
                  </div>
                  <div className="mt-1 text-base font-extrabold text-gradient-gold">
                    {fmt(o.gross_cents, o.currency)}
                  </div>
                </div>
              </div>
            </div>

            {paid && (
              <div className="mt-6 space-y-2.5">
                {prod?.has_members_area && (
                  <Link to="/membros/$slug" params={{ slug: prod.slug }} className="block">
                    <Button className="w-full gradient-brand text-primary-foreground font-bold">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Aceder à Área de Membros
                    </Button>
                  </Link>
                )}
                {prod?.file_url && (
                  <a href={prod.file_url} target="_blank" rel="noreferrer" className="block">
                    <Button className="w-full gradient-brand text-primary-foreground font-bold">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Produto Digital
                    </Button>
                  </a>
                )}
                {prod?.external_url && (
                  <a href={prod.external_url} target="_blank" rel="noreferrer" className="block">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Aceder ao Conteúdo
                    </Button>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ORDER BUMP PRODUCT CARD (IF PURCHASED) */}
          {bumpProd && (
            <div className="rounded-2xl border border-gold/40 bg-gold/5 p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Oferta Especial Incluída
                  </span>
                  {paid && (
                    <span className="rounded-full bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 border border-success/20">
                      Acesso Liberado
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-secondary shrink-0 border border-gold/30">
                    {bumpProd.cover_url ? (
                      <img src={bumpProd.cover_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-[10px] text-gold font-bold">
                        BUMP
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm line-clamp-2 text-foreground">
                      {bumpProd.title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Produto complementar</div>
                  </div>
                </div>
              </div>

              {paid && (
                <div className="mt-6 space-y-2.5">
                  {bumpProd.has_members_area && (
                    <Link to="/membros/$slug" params={{ slug: bumpProd.slug }} className="block">
                      <Button className="w-full gradient-brand text-primary-foreground font-bold">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Aceder ao Curso Complementar
                      </Button>
                    </Link>
                  )}
                  {bumpProd.file_url && (
                    <a href={bumpProd.file_url} target="_blank" rel="noreferrer" className="block">
                      <Button className="w-full gradient-brand text-primary-foreground font-bold">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Oferta Especial
                      </Button>
                    </a>
                  )}
                  {bumpProd.external_url && (
                    <a
                      href={bumpProd.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Aceder ao Conteúdo
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ORDER METADATA DETAILS */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Dados do Pedido
            </div>
            <dl className="space-y-2.5 text-xs sm:text-sm">
              <Row k="Estado" v={paid ? "Pago / Confirmado" : "Pendente"} />
              <Row k="Método" v={METHOD_LABEL[o.payment_method] ?? o.payment_method} />
              <Row k="Comprador" v={o.buyer_name ?? "-"} />
              <Row k="Email" v={o.buyer_email ?? "-"} />
              <Row k="Data" v={new Date(o.created_at).toLocaleString("pt-PT")} />
              <Row
                k="Código do Pedido"
                v={
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(token);
                      toast.success("Código copiado para a área de transferência");
                    }}
                    className="inline-flex items-center gap-1 hover:text-foreground font-mono text-xs text-primary"
                  >
                    {token.slice(0, 14)}… <Copy className="h-3 w-3" />
                  </button>
                }
              />
            </dl>

            {!paid && (
              <div className="mt-4 rounded-xl bg-secondary/70 p-3 text-xs text-muted-foreground leading-relaxed">
                Esta página atualiza automaticamente a cada 12 segundos assim que o pagamento for
                detectado.
              </div>
            )}
          </div>
        </div>

        {/* PENDING PAYMENT REFERENCE INSTRUCTIONS */}
        {!paid && payRef && (
          <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/5 p-6 sm:p-8 shadow-card">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="text-sm font-bold uppercase tracking-wider text-gold">
                Instruções de Pagamento — {payRef.provider}
              </div>
              {payRef.mode === "test" && (
                <span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-warning">
                  Ambiente de Testes
                </span>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <RefBox label="Entidade" value={payRef.entity} />
              <RefBox label="Referência" value={payRef.reference} />
              <RefBox label="Valor a Pagar" value={fmt(o.gross_cents, o.currency)} />
            </div>

            <div className="mt-6 pt-4 border-t border-gold/20">
              <div className="text-xs font-semibold text-foreground mb-2">Como pagar:</div>
              <ol className="space-y-1.5 text-xs text-muted-foreground list-decimal list-inside">
                {payRef.instructions.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="mt-10 text-center flex items-center justify-center gap-4">
          <Link to="/loja">
            <Button variant="outline">
              Explorar outros produtos <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1 border-b border-border/40 last:border-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-semibold text-right min-w-0 truncate text-foreground">{v}</dd>
    </div>
  );
}

function RefBox({ label, value }: { label: string; value: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value);
        toast.success(`${label} copiada!`);
      }}
      className="rounded-xl border border-border bg-card p-3.5 text-left hover:border-gold transition cursor-pointer group"
    >
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono font-bold text-base flex items-center justify-between gap-2 text-foreground group-hover:text-gold">
        <span className="truncate">{value}</span>
        <Copy className="h-3.5 w-3.5 opacity-60 shrink-0" />
      </div>
    </button>
  );
}
