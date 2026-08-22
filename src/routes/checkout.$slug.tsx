import { createFileRoute, useRouter, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProductBySlug } from "@/lib/catalog.functions";
import { createOrder } from "@/lib/checkout.functions";
import { getCheckoutOffers } from "@/lib/funnel.functions";
import { getRef } from "@/lib/affiliate-ref";
import { getProductTracking } from "@/lib/tracking.functions";
import { TrackingScripts } from "@/components/TrackingScripts";
import { getCheckoutConfigFn } from "@/lib/checkout-builder.functions";
import { buildDefaultConfig } from "@/lib/checkout-builder.service";
import { CheckoutRenderer } from "@/components/checkout-builder/CheckoutRenderer";
import type { CheckoutCustomizationConfig } from "@/types/checkout-builder";

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

function Checkout() {
  const { slug } = Route.useParams();
  const router = useRouter();
  const { data: p } = useSuspenseQuery(opt(slug));

  const getConfigServerFn = useServerFn(getCheckoutConfigFn);

  // Load seller or product custom checkout configuration
  const { data: checkoutConfig } = useQuery({
    queryKey: ["checkout-config-public", p?.seller_id, p?.id],
    queryFn: () =>
      p?.seller_id
        ? getConfigServerFn({
            data: {
              sellerId: p.seller_id,
              productId: p.id,
              includeDraft: false,
            },
          })
        : Promise.resolve(null),
    enabled: !!p?.seller_id,
    staleTime: 60_000,
  });

  const activeConfig: CheckoutCustomizationConfig = useMemo(() => {
    if (checkoutConfig) return checkoutConfig;
    return buildDefaultConfig(p?.seller_id || "seller_default", p?.id);
  }, [checkoutConfig, p?.seller_id, p?.id]);

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
  const [method, setMethod] = useState<string>(
    activeConfig.defaultPaymentMethod || "multicaixa_express",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!p) return null;

  const basePrice =
    p.promo_price_cents && p.promo_price_cents < p.price_cents
      ? p.promo_price_cents
      : p.price_cents;

  const bumpPrice =
    includeBump && orderBump && activeConfig.model !== "simples" && activeConfig.showOrderBump
      ? orderBump.offer_price_cents
      : 0;

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
          order_bump_offer_id:
            includeBump && orderBump && activeConfig.model !== "simples" && activeConfig.showOrderBump
              ? orderBump.id
              : null,
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

      <CheckoutRenderer
        config={activeConfig}
        product={{
          id: p.id,
          title: p.title,
          cover_url: p.cover_url,
          price_cents: p.price_cents,
          promo_price_cents: p.promo_price_cents,
          currency: p.currency,
          slug: p.slug,
          guarantee_days: p.guarantee_days,
          short_description: p.short_description,
          description: p.description,
        }}
        orderBump={orderBump}
        includeBump={includeBump}
        setIncludeBump={setIncludeBump}
        selectedMethod={method}
        setSelectedMethod={setMethod}
        buyerName={name}
        setBuyerName={setName}
        buyerEmail={email}
        setBuyerEmail={setEmail}
        buyerPhone={phone}
        setBuyerPhone={setPhone}
        onSubmit={submit}
        loading={loading}
        isPreview={false}
      />
    </SiteLayout>
  );
}
