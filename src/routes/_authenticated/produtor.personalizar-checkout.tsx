import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  Palette,
  Sparkles,
  Layers,
  Smartphone,
  Monitor,
  Save,
  Rocket,
  RotateCcw,
  CheckCircle2,
  Lock,
  Zap,
  ShieldCheck,
  Tag,
  Clock,
  Gift,
  Star,
  Eye,
  Plus,
  Trash2,
  Settings,
  HelpCircle,
  ShoppingBag,
  CreditCard,
  Building2,
  ChevronRight,
  Flame,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { listMyProducts } from "@/lib/products.functions";
import {
  getCheckoutConfigFn,
  saveCheckoutConfigFn,
  resetCheckoutConfigFn,
} from "@/lib/checkout-builder.functions";
import {
  getPresetForModel,
  getPresetForPersonality,
  buildDefaultConfig,
} from "@/lib/checkout-builder.service";
import { CheckoutRenderer } from "@/components/checkout-builder/CheckoutRenderer";
import type {
  CheckoutCustomizationConfig,
  CheckoutModel,
  CheckoutPersonality,
  CheckoutCtaIcon,
  CheckoutCtaStyle,
  CheckoutCardRadius,
  CheckoutButtonRadius,
  CheckoutBgTheme,
} from "@/types/checkout-builder";

export const Route = createFileRoute("/_authenticated/produtor/personalizar-checkout")({
  head: () => ({
    meta: [
      { title: "Personalizar Checkout — InfroPay" },
      { name: "description", content: "Checkout Builder: personalize seu modelo de checkout na InfroPay." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutBuilderPage,
});

const MODEL_OPTIONS: Array<{
  id: CheckoutModel;
  label: string;
  desc: string;
  badge: string;
  badgeColor: string;
}> = [
  {
    id: "simples",
    label: "Checkout Simples",
    desc: "Apenas o essencial: produto, dados, pagamento e botão direto. Sem contador, ofertas ou distrações.",
    badge: "Mais Limpo & Direto",
    badgeColor: "bg-slate-700 text-slate-200",
  },
  {
    id: "conversao",
    label: "Checkout Conversão",
    desc: "Focado em alta taxa de conversão: CTA destacado, garantia, benefícios e prova social.",
    badge: "Recomendado",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
  },
  {
    id: "oferta",
    label: "Checkout com Oferta",
    desc: "Urgência máxima: contagem regressiva viva, banner promocional e incentivos de escassez.",
    badge: "Alta Urgência",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    id: "personalizado",
    label: "Checkout Personalizado",
    desc: "Controle total e granular sobre cada seção, elemento, cores e comportamentos do checkout.",
    badge: "Controle Total",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
];

const PERSONALITY_OPTIONS: Array<{
  id: CheckoutPersonality;
  label: string;
  desc: string;
}> = [
  { id: "minimalista", label: "Minimalista", desc: "Tons neutros, linhas limpas, zero excessos" },
  { id: "profissional", label: "Profissional", desc: "Azul corporativo, sobriedade e seriedade" },
  { id: "premium", label: "Premium / Luxo", desc: "Dourado escovado, acabamento nobre e sofisticado" },
  { id: "conversao", label: "Conversão Extrema", desc: "Contrastes quentes, botões chamativos e foco em ação" },
  { id: "moderno", label: "Moderno Tech", desc: "Gradientes violeta, cantos arredondados e visual futurista" },
  { id: "personalizado", label: "Personalizado", desc: "Ajuste fino de paleta e espaçamentos" },
];

const CTA_SUGGESTIONS = [
  "GARANTIR MINHA COMPRA AGORA",
  "PAGAR E RECEBER ACESSO IMEDIATO",
  "SIM! QUERO APROVEITAR ESTA OFERTA",
  "FINALIZAR MEU PEDIDO SEGURO",
  "COMPRAR AGORA COM DESCONTO",
];

function CheckoutBuilderPage() {
  const { user } = useAuth();
  const sellerId = user?.uid || "seller_default";

  const listProdFn = useServerFn(listMyProducts);
  const getConfigFn = useServerFn(getCheckoutConfigFn);
  const saveConfigFn = useServerFn(saveCheckoutConfigFn);
  const resetConfigFn = useServerFn(resetCheckoutConfigFn);

  const { data: myProducts = [] } = useQuery({
    queryKey: ["producer", "products"],
    queryFn: () => listProdFn(),
  });

  const [selectedProductId, setSelectedProductId] = useState<string>("global");
  const [selectedSection, setSelectedSection] = useState<string>("model");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [saving, setSaving] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // Active configuration in state
  const [config, setConfig] = useState<CheckoutCustomizationConfig>(() =>
    buildDefaultConfig(sellerId, null),
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load config when seller or product selection changes
  const { data: remoteConfig, isLoading } = useQuery({
    queryKey: ["checkout-config", sellerId, selectedProductId],
    queryFn: () =>
      getConfigFn({
        data: {
          sellerId,
          productId: selectedProductId === "global" ? null : selectedProductId,
          includeDraft: true,
        },
      }),
    enabled: !!sellerId,
  });

  useEffect(() => {
    if (remoteConfig) {
      setConfig(remoteConfig);
      setHasUnsavedChanges(false);
    }
  }, [remoteConfig]);

  // Current active preview product
  const activeProduct = useMemo(() => {
    if (selectedProductId !== "global") {
      const p = myProducts.find((item: any) => item.id === selectedProductId);
      if (p) {
        return {
          id: p.id,
          title: p.title || p.name || "Produto Digital Selecionado",
          cover_url: p.cover_url || p.image,
          price_cents: p.price_cents || (p.price ? Math.round(p.price * 100) : 1500000),
          promo_price_cents: p.promo_price_cents,
          currency: p.currency || "AOA",
          slug: p.slug || "produto-exemplo",
          guarantee_days: p.guarantee_days ?? 7,
          short_description: p.short_description || "Acesso completo e suporte",
        };
      }
    }
    // Default simulated product for live builder
    return {
      id: "preview_prod_1",
      title: "Guia Completo de Marketing Digital & Vendas em Angola",
      cover_url:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
      price_cents: 2500000,
      promo_price_cents: 1850000,
      currency: "AOA",
      slug: "guia-marketing-digital",
      guarantee_days: 7,
      short_description: "Ebook prático com estratégias comprovadas para faturar online em Angola.",
    };
  }, [selectedProductId, myProducts]);

  const simulatedOrderBump = useMemo(
    () => ({
      id: "bump_simulated",
      headline: "Adicionar Pacote de 50 Templates Prontos de Anúncios",
      offer_price_cents: 500000,
      description: "Modelos validados de alta conversão para Canva e Photoshop com licença comercial.",
      offer: {
        title: "50 Templates Prontos de Alta Conversão",
        cover_url:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80",
      },
    }),
    [],
  );

  // Helper to mutate config
  function updateConfig(updater: (prev: CheckoutCustomizationConfig) => CheckoutCustomizationConfig) {
    setConfig((prev) => {
      const next = updater(prev);
      return next;
    });
    setHasUnsavedChanges(true);
  }

  // Handle Model change
  function handleSelectModel(modelId: CheckoutModel) {
    updateConfig((prev) => ({
      ...prev,
      ...getPresetForModel(modelId, prev),
      model: modelId,
    }));
    toast.info(`Modelo alterado para: ${MODEL_OPTIONS.find((m) => m.id === modelId)?.label}`);
  }

  // Handle Personality Preset change
  function handleSelectPersonality(personalityId: CheckoutPersonality) {
    updateConfig((prev) => ({
      ...prev,
      ...getPresetForPersonality(personalityId),
      personality: personalityId,
    }));
    toast.info(`Estilo visual atualizado para: ${personalityId}`);
  }

  // Save changes
  async function handleSave(isPublish: boolean = false) {
    setSaving(true);
    try {
      const result = await saveConfigFn({
        data: {
          config,
          isPublish,
        },
      });
      setConfig(result);
      setHasUnsavedChanges(false);
      if (isPublish) {
        toast.success("🚀 Checkout publicado com sucesso! Seus compradores já verão o novo modelo.");
      } else {
        toast.success("💾 Rascunho salvo com sucesso.");
      }
    } catch (e) {
      toast.error(`Erro ao salvar: ${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  }

  // Reset to default
  async function handleResetDefault() {
    setSaving(true);
    try {
      const result = await resetConfigFn({
        data: {
          sellerId,
          productId: selectedProductId === "global" ? null : selectedProductId,
        },
      });
      setConfig(result);
      setHasUnsavedChanges(false);
      setIsResetOpen(false);
      toast.success("↩ Modelo de checkout restaurado para o padrão com sucesso!");
    } catch (e) {
      toast.error(`Erro ao restaurar: ${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  }

  // Add / remove benefits
  function addBenefit() {
    updateConfig((prev) => ({
      ...prev,
      benefitsList: [
        ...prev.benefitsList,
        {
          id: `b_${Date.now()}`,
          icon: "CheckCircle2",
          title: "Novo Benefício Exclusivo",
          desc: "Descreva o que o comprador vai receber de valor aqui.",
        },
      ],
    }));
  }

  function removeBenefit(id: string) {
    updateConfig((prev) => ({
      ...prev,
      benefitsList: prev.benefitsList.filter((b) => b.id !== id),
    }));
  }

  // Add / remove testimonials
  function addTestimonial() {
    updateConfig((prev) => ({
      ...prev,
      testimonialsList: [
        ...prev.testimonialsList,
        {
          id: `t_${Date.now()}`,
          name: "Novo Cliente Satisfeito",
          role: "Cliente Verificado",
          rating: 5,
          text: "Excelente produto! Recomendo a todos.",
          location: "Luanda",
        },
      ],
    }));
  }

  function removeTestimonial(id: string) {
    updateConfig((prev) => ({
      ...prev,
      testimonialsList: prev.testimonialsList.filter((t) => t.id !== id),
    }));
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      {/* TOP HEADER TOOLBAR */}
      <header className="h-16 border-b border-border/80 bg-card/60 backdrop-blur px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-xl gradient-brand grid place-items-center text-primary-foreground shrink-0 shadow-glow">
            <Palette className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg text-foreground truncate">
                Personalizar Checkout
              </h1>
              {config.status === "published" && !hasUnsavedChanges ? (
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] px-2 py-0.5"
                >
                  <Check className="h-3 w-3 mr-1" /> Publicado
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-[10px] px-2 py-0.5"
                >
                  <Clock className="h-3 w-3 mr-1" /> Rascunho não publicado
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block truncate">
              Configure a aparência, modelo, elementos de conversão e pagamentos do seu checkout.
            </p>
          </div>
        </div>

        {/* CONTROLS & ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          {/* PRODUCT SCOPE SELECTOR */}
          <div className="hidden md:flex items-center gap-2">
            <Label className="text-xs text-muted-foreground whitespace-nowrap">Personalizar:</Label>
            <Select value={selectedProductId} onValueChange={(v) => setSelectedProductId(v)}>
              <SelectTrigger className="h-9 text-xs w-[200px] bg-background">
                <SelectValue placeholder="Selecione o produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">🌐 Padrão Geral da Conta</SelectItem>
                {myProducts.map((prod: any) => (
                  <SelectItem key={prod.id} value={prod.id}>
                    📦 {prod.title || prod.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* VIEWPORT TOGGLE */}
          <div className="hidden sm:flex items-center rounded-lg border border-border/80 p-0.5 bg-background">
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              className={`p-1.5 rounded-md text-xs font-medium transition ${
                viewport === "desktop"
                  ? "bg-secondary text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Visualização Computador"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              className={`p-1.5 rounded-md text-xs font-medium transition ${
                viewport === "mobile"
                  ? "bg-secondary text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Visualização Telemóvel"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>

          {/* RESTORE DEFAULT BUTTON */}
          <AlertDialog open={isResetOpen} onOpenChange={setIsResetOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 text-xs text-muted-foreground hover:text-destructive hover:border-destructive/40"
              >
                <RotateCcw className="h-3.5 w-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Restaurar padrão</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" /> Restaurar modelo padrão?
                </AlertDialogTitle>
                <AlertDialogDescription className="leading-relaxed">
                  Esta ação irá apagar todas as personalizações de cores, textos de CTA, contadores e
                  seções customizadas para este checkout, restaurando o layout padrão oficial da
                  InfroPay. Tem certeza que deseja continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleResetDefault}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold"
                >
                  Sim, restaurar padrão
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* SAVE DRAFT */}
          <Button
            variant="secondary"
            size="sm"
            disabled={saving}
            onClick={() => handleSave(false)}
            className="h-9 text-xs"
          >
            <Save className="h-3.5 w-3.5 mr-1.5" />
            <span className="hidden sm:inline">Salvar rascunho</span>
          </Button>

          {/* PUBLISH */}
          <Button
            size="sm"
            disabled={saving}
            onClick={() => handleSave(true)}
            className="h-9 text-xs gradient-brand text-primary-foreground font-bold shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Rocket className="h-3.5 w-3.5 mr-1.5" />
            <span>Publicar Checkout</span>
          </Button>
        </div>
      </header>

      {/* 3-COLUMN WORKSPACE */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)_340px] xl:grid-cols-[300px_minmax(0,1fr)_380px] h-[calc(100vh-4rem-4rem)] overflow-hidden">
        {/* LEFT COLUMN: ELEMENTS & SECTIONS LIST */}
        <aside className="border-r border-border/80 bg-card/40 overflow-y-auto p-4 space-y-5 hidden md:block">
          {/* MODEL PICKER QUICK SELECT */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" /> Modelo do Checkout
            </span>
            <div className="grid gap-1.5">
              {MODEL_OPTIONS.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => handleSelectModel(m.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                    config.model === m.id
                      ? "border-primary bg-primary/15 shadow-sm ring-1 ring-primary/40"
                      : "border-border/60 bg-background/50 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-foreground">{m.label}</span>
                    {config.model === m.id && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {m.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* PERSONALITY PRESETS */}
          <div className="space-y-2 pt-3 border-t border-border/60">
            <span className="text-[11px] uppercase tracking-wider font-bold text-gold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> Personalidade do Checkout
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {PERSONALITY_OPTIONS.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => handleSelectPersonality(p.id)}
                  className={`p-2 rounded-lg border text-left text-xs transition cursor-pointer ${
                    config.personality === p.id
                      ? "border-gold bg-gold/15 text-gold font-bold ring-1 ring-gold/40"
                      : "border-border/60 bg-background/50 text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  <div className="truncate">{p.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SECTIONS & ELEMENTS TOGGLE LIST */}
          <div className="space-y-2 pt-3 border-t border-border/60">
            <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Elementos & Seções
            </span>

            <div className="space-y-1">
              {[
                {
                  id: "identity",
                  label: "Identidade & Marca",
                  icon: Palette,
                  configurable: true,
                },
                {
                  id: "product",
                  label: "Produto & Preço",
                  icon: Tag,
                  active: config.showProductImage,
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, showProductImage: v })),
                },
                {
                  id: "buyer_data",
                  label: "Dados do Comprador",
                  icon: Lock,
                  configurable: true,
                },
                {
                  id: "payment_methods",
                  label: "Métodos de Pagamento",
                  icon: CreditCard,
                  configurable: true,
                },
                {
                  id: "cta",
                  label: "Botão de Compra / CTA",
                  icon: Zap,
                  active: config.ctaEnabled && config.model !== "simples",
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, ctaEnabled: v })),
                },
                {
                  id: "offer",
                  label: "Oferta Especial",
                  icon: Sparkles,
                  active: config.showOffer && config.model !== "simples",
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, showOffer: v })),
                },
                {
                  id: "countdown",
                  label: "Contador Regressivo",
                  icon: Clock,
                  active: config.showCountdown && config.model !== "simples",
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, showCountdown: v })),
                },
                {
                  id: "order_bump",
                  label: "Order Bump / Upsell",
                  icon: Gift,
                  active: config.showOrderBump && config.model !== "simples",
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, showOrderBump: v })),
                },
                {
                  id: "benefits",
                  label: "Benefícios do Produto",
                  icon: CheckCircle2,
                  active: config.showBenefits && config.model !== "simples",
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, showBenefits: v })),
                },
                {
                  id: "testimonials",
                  label: "Depoimentos & Prova Social",
                  icon: Star,
                  active: config.showTestimonials && config.model !== "simples",
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, showTestimonials: v })),
                },
                {
                  id: "guarantee",
                  label: "Garantia & Segurança",
                  icon: ShieldCheck,
                  active: config.showGuarantee,
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, showGuarantee: v })),
                },
                {
                  id: "summary",
                  label: "Resumo do Pedido",
                  icon: ShoppingBag,
                  active: config.showOrderSummary,
                  onToggle: (v: boolean) => updateConfig((c) => ({ ...c, showOrderSummary: v })),
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition cursor-pointer ${
                    selectedSection === item.id
                      ? "bg-secondary text-foreground font-bold border border-border"
                      : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <item.icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.onToggle && (
                    <Switch
                      checked={item.active ?? false}
                      onCheckedChange={item.onToggle}
                      onClick={(e) => e.stopPropagation()}
                      className="scale-75 origin-right"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: LIVE CHECKOUT PREVIEW */}
        <main className="flex-1 bg-neutral-950/60 p-3 sm:p-6 overflow-y-auto flex flex-col items-center justify-start relative">
          <div className="w-full flex items-center justify-between pb-3 mb-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-primary" /> Pré-visualização em tempo real
              </span>
              <span className="text-[11px] text-muted-foreground">
                (Clique em qualquer elemento para editar suas propriedades)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono">
                {viewport === "desktop" ? "100% Desktop" : "390px Mobile"}
              </span>
            </div>
          </div>

          {/* VIEWPORT WRAPPER */}
          <div
            className={`transition-all duration-300 w-full rounded-2xl border border-border/80 shadow-2xl overflow-hidden bg-background ${
              viewport === "mobile" ? "max-w-[420px] my-auto" : "max-w-5xl"
            }`}
          >
            <CheckoutRenderer
              config={config}
              product={activeProduct}
              orderBump={simulatedOrderBump}
              includeBump={false}
              selectedMethod={config.defaultPaymentMethod}
              buyerName="Carlos Eduardo Silva"
              buyerEmail="carlos.silva@exemplo.ao"
              buyerPhone="+244 923 111 222"
              isPreview={true}
              selectedElementId={selectedSection}
              onSelectElement={(id) => setSelectedSection(id)}
            />
          </div>
        </main>

        {/* RIGHT COLUMN: ELEMENT CONFIGURATION INSPECTOR */}
        <aside className="border-l border-border/80 bg-card/60 overflow-y-auto p-4 sm:p-5 space-y-6">
          <div className="pb-3 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-sm text-foreground uppercase tracking-wider">
                Configurações da Seção
              </h2>
            </div>
            <Badge variant="outline" className="text-[10px] uppercase">
              {selectedSection}
            </Badge>
          </div>

          {/* DYNAMIC SETTINGS PANEL BASED ON SELECTED SECTION */}

          {/* SECTION: MODEL */}
          {selectedSection === "model" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Modelo Escolhido</Label>
                <Select
                  value={config.model}
                  onValueChange={(v: CheckoutModel) => handleSelectModel(v)}
                >
                  <SelectTrigger className="h-10 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODEL_OPTIONS.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 rounded-xl bg-secondary/50 border border-border text-xs leading-relaxed space-y-2">
                <div className="font-bold text-foreground">Regra do modelo selecionado:</div>
                {config.model === "simples" ? (
                  <p className="text-muted-foreground">
                    ✓ <strong>Checkout Simples:</strong> Remove automaticamente contadores,
                    ofertas extras, order bumps e elementos promocionais. Mantém apenas produto,
                    preço, dados do cliente e botões essenciais.
                  </p>
                ) : config.model === "conversao" ? (
                  <p className="text-muted-foreground">
                    ✓ <strong>Checkout Conversão:</strong> Ativa CTA customizado, selos de garantia,
                    benefícios e prova social para maximizar vendas.
                  </p>
                ) : config.model === "oferta" ? (
                  <p className="text-muted-foreground">
                    ✓ <strong>Checkout com Oferta:</strong> Ativa banner de oferta especial e
                    contador de escassez regressivo em tempo real.
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    ✓ <strong>Checkout Personalizado:</strong> Você escolhe livremente quais elementos
                    deseja ativar ou desativar nos interruptores.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* SECTION: IDENTITY & VISUAL THEME */}
          {selectedSection === "identity" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Nome da Marca / Produtor</Label>
                <Input
                  value={config.brandName || ""}
                  onChange={(e) => updateConfig((c) => ({ ...c, brandName: e.target.value }))}
                  placeholder="Ex.: Sua Marca / Nome do Produtor"
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">URL do Logótipo da Marca</Label>
                <Input
                  value={config.brandLogoUrl || ""}
                  onChange={(e) => updateConfig((c) => ({ ...c, brandLogoUrl: e.target.value }))}
                  placeholder="https://exemplo.com/logo.png"
                  className="h-9 text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Exibir Logótipo / Marca</Label>
                  <p className="text-[10px] text-muted-foreground">Mostrar no topo do checkout</p>
                </div>
                <Switch
                  checked={config.showBrandLogo}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showBrandLogo: v }))}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Selo Oficial InfroPay</Label>
                  <p className="text-[10px] text-muted-foreground">Transmite segurança e conformidade</p>
                </div>
                <Switch
                  checked={config.showInfropayBadge}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showInfropayBadge: v }))}
                />
              </div>

              <div className="space-y-1.5 pt-2 border-t border-border/50">
                <Label className="text-xs font-semibold">Tema de Fundo</Label>
                <Select
                  value={config.bgTheme}
                  onValueChange={(v: CheckoutBgTheme) =>
                    updateConfig((c) => ({ ...c, bgTheme: v }))
                  }
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark_clean">Escuro Elegante (Padrão)</SelectItem>
                    <SelectItem value="dark_luxury">Preto Luxo / Ônix</SelectItem>
                    <SelectItem value="light_modern">Claro Moderno</SelectItem>
                    <SelectItem value="light_minimal">Branco Minimalista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Arredondamento dos Cards</Label>
                <Select
                  value={config.cardRadius}
                  onValueChange={(v: CheckoutCardRadius) =>
                    updateConfig((c) => ({ ...c, cardRadius: v }))
                  }
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Reto (0px)</SelectItem>
                    <SelectItem value="md">Suave (8px)</SelectItem>
                    <SelectItem value="lg">Médio (12px)</SelectItem>
                    <SelectItem value="2xl">Arredondado (16px)</SelectItem>
                    <SelectItem value="3xl">Super Arredondado (24px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Estilo dos Botões</Label>
                <Select
                  value={config.buttonRadius}
                  onValueChange={(v: CheckoutButtonRadius) =>
                    updateConfig((c) => ({ ...c, buttonRadius: v }))
                  }
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Quadrado (0px)</SelectItem>
                    <SelectItem value="md">Suave (8px)</SelectItem>
                    <SelectItem value="xl">Arredondado (12px)</SelectItem>
                    <SelectItem value="full">Pill / Redondo (Total)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* SECTION: CTA / PAYMENT BUTTON */}
          {selectedSection === "cta" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">CTA Personalizado</Label>
                  <p className="text-[10px] text-muted-foreground">
                    Ativa texto e ícones de conversão
                  </p>
                </div>
                <Switch
                  checked={config.ctaEnabled && config.model !== "simples"}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, ctaEnabled: v }))}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Texto do Botão (CTA)</Label>
                <Input
                  value={config.ctaText}
                  onChange={(e) => updateConfig((c) => ({ ...c, ctaText: e.target.value }))}
                  placeholder="Ex.: GARANTIR MINHA COMPRA AGORA"
                  className="h-9 text-xs font-bold"
                />
              </div>

              {/* CTA SUGGESTIONS */}
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground">Sugestões rápidas:</span>
                <div className="flex flex-wrap gap-1">
                  {CTA_SUGGESTIONS.map((sug, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => updateConfig((c) => ({ ...c, ctaText: sug }))}
                      className="text-[10px] px-2 py-1 rounded bg-secondary hover:bg-secondary/80 text-foreground border border-border/60 transition"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Subtexto do Botão (Opcional)</Label>
                <Input
                  value={config.ctaSubtext || ""}
                  onChange={(e) => updateConfig((c) => ({ ...c, ctaSubtext: e.target.value }))}
                  placeholder="Ex.: Acesso imediato e seguro após confirmação"
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Ícone do CTA</Label>
                <Select
                  value={config.ctaIcon}
                  onValueChange={(v: CheckoutCtaIcon) => updateConfig((c) => ({ ...c, ctaIcon: v }))}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lock">🔒 Cadeado de Segurança (Lock)</SelectItem>
                    <SelectItem value="Zap">⚡ Raio de Acesso Imediato (Zap)</SelectItem>
                    <SelectItem value="ShieldCheck">🛡️ Escudo de Garantia (ShieldCheck)</SelectItem>
                    <SelectItem value="Sparkles">✨ Estrelas / Brilho (Sparkles)</SelectItem>
                    <SelectItem value="Flame">🔥 Chama de Urgência (Flame)</SelectItem>
                    <SelectItem value="ArrowRight">➡️ Seta para a Direita (ArrowRight)</SelectItem>
                    <SelectItem value="ShoppingCart">🛒 Carrinho de Compras</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Estilo Visual do Botão</Label>
                <Select
                  value={config.ctaStyle}
                  onValueChange={(v: CheckoutCtaStyle) =>
                    updateConfig((c) => ({ ...c, ctaStyle: v }))
                  }
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gradient">Gradiente Laranja InfroPay</SelectItem>
                    <SelectItem value="gold">Dourado Ouro Brilhante</SelectItem>
                    <SelectItem value="emerald">Verde Esmeralda Sucesso</SelectItem>
                    <SelectItem value="glow">Brilho Neon Glow</SelectItem>
                    <SelectItem value="minimal">Minimalista Sólido</SelectItem>
                    <SelectItem value="outline">Outline Moderno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* SECTION: OFFER & COUNTDOWN */}
          {(selectedSection === "offer" || selectedSection === "countdown") && (
            <div className="space-y-5">
              {/* OFFER TOGGLE & DETAILS */}
              <div className="space-y-3 p-3 rounded-xl border border-border bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-bold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-gold" /> Mostrar Oferta Especial
                    </Label>
                    <p className="text-[10px] text-muted-foreground">Banner promocional de topo</p>
                  </div>
                  <Switch
                    checked={config.showOffer}
                    onCheckedChange={(v) => updateConfig((c) => ({ ...c, showOffer: v }))}
                  />
                </div>

                {config.showOffer && (
                  <div className="space-y-2 pt-2 border-t border-border/50 animate-fade-in">
                    <div className="space-y-1">
                      <Label className="text-xs">Título da Oferta</Label>
                      <Input
                        value={config.offerHeadline}
                        onChange={(e) =>
                          updateConfig((c) => ({ ...c, offerHeadline: e.target.value }))
                        }
                        placeholder="Ex.: Oferta especial por tempo limitado"
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Subtítulo / Descrição</Label>
                      <Input
                        value={config.offerSubtitle}
                        onChange={(e) =>
                          updateConfig((c) => ({ ...c, offerSubtitle: e.target.value }))
                        }
                        placeholder="Ex.: Desconto promocional aplicado com liberação instantânea"
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* COUNTDOWN TIMER TOGGLE & DETAILS */}
              <div className="space-y-3 p-3 rounded-xl border border-border bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-bold flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold" /> Mostrar Contador Regressivo
                    </Label>
                    <p className="text-[10px] text-muted-foreground">
                      Contagem regressiva ativa segundo a segundo
                    </p>
                  </div>
                  <Switch
                    checked={config.showCountdown}
                    onCheckedChange={(v) => updateConfig((c) => ({ ...c, showCountdown: v }))}
                  />
                </div>

                {config.showCountdown && (
                  <div className="space-y-2.5 pt-2 border-t border-border/50 animate-fade-in">
                    <div className="space-y-1">
                      <Label className="text-xs">Texto de Urgência</Label>
                      <Input
                        value={config.countdownUrgencyText}
                        onChange={(e) =>
                          updateConfig((c) => ({ ...c, countdownUrgencyText: e.target.value }))
                        }
                        placeholder="Ex.: Esta oferta especial expira em:"
                        className="h-8 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Duração (Minutos)</Label>
                        <Input
                          type="number"
                          min={1}
                          max={180}
                          value={config.countdownMinutes}
                          onChange={(e) =>
                            updateConfig((c) => ({
                              ...c,
                              countdownMinutes: Math.max(1, Number(e.target.value) || 15),
                            }))
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Cor do Contador</Label>
                        <Select
                          value={config.countdownColor}
                          onValueChange={(v: any) =>
                            updateConfig((c) => ({ ...c, countdownColor: v }))
                          }
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gold">Dourado</SelectItem>
                            <SelectItem value="red">Vermelho Urgente</SelectItem>
                            <SelectItem value="orange">Laranja Vibrante</SelectItem>
                            <SelectItem value="emerald">Verde Esmeralda</SelectItem>
                            <SelectItem value="purple">Púrpura</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: PAYMENT METHODS */}
          {selectedSection === "payment_methods" && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Métodos de Pagamento Disponíveis</Label>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Marque apenas os métodos que deseja disponibilizar no checkout dos seus clientes.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background/50">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Multicaixa Express</div>
                      <div className="text-[10px] text-muted-foreground">Pagamento instantâneo via telemóvel</div>
                    </div>
                  </div>
                  <Switch
                    checked={config.paymentMethods.multicaixa_express}
                    onCheckedChange={(v) =>
                      updateConfig((c) => ({
                        ...c,
                        paymentMethods: { ...c.paymentMethods, multicaixa_express: v },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background/50">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Pagamento por Referência (ATM)</div>
                      <div className="text-[10px] text-muted-foreground">Multicaixa & Internet Banking</div>
                    </div>
                  </div>
                  <Switch
                    checked={config.paymentMethods.referencia}
                    onCheckedChange={(v) =>
                      updateConfig((c) => ({
                        ...c,
                        paymentMethods: { ...c.paymentMethods, referencia: v },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background/50">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Transferência Bancária</div>
                      <div className="text-[10px] text-muted-foreground">Comprovativo manual com IBAN direto</div>
                    </div>
                  </div>
                  <Switch
                    checked={config.paymentMethods.transferencia}
                    onCheckedChange={(v) =>
                      updateConfig((c) => ({
                        ...c,
                        paymentMethods: { ...c.paymentMethods, transferencia: v },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: BENEFITS */}
          {selectedSection === "benefits" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Exibir Benefícios</Label>
                  <p className="text-[10px] text-muted-foreground">Lista de diferenciais do produto</p>
                </div>
                <Switch
                  checked={config.showBenefits}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showBenefits: v }))}
                />
              </div>

              {config.showBenefits && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground">Itens ({config.benefitsList.length})</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addBenefit}
                      className="h-7 text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Adicionar
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    {config.benefitsList.map((b, idx) => (
                      <div key={b.id} className="p-2.5 rounded-xl border border-border bg-background/60 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <Input
                            value={b.title}
                            onChange={(e) => {
                              const next = [...config.benefitsList];
                              next[idx].title = e.target.value;
                              updateConfig((c) => ({ ...c, benefitsList: next }));
                            }}
                            placeholder="Título do benefício"
                            className="h-7 text-xs font-bold"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBenefit(b.id)}
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <Input
                          value={b.desc}
                          onChange={(e) => {
                            const next = [...config.benefitsList];
                            next[idx].desc = e.target.value;
                            updateConfig((c) => ({ ...c, benefitsList: next }));
                          }}
                          placeholder="Descrição rápida do benefício"
                          className="h-7 text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION: TESTIMONIALS */}
          {selectedSection === "testimonials" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Depoimentos / Prova Social</Label>
                  <p className="text-[10px] text-muted-foreground">Avaliações de clientes satisfeitos</p>
                </div>
                <Switch
                  checked={config.showTestimonials}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showTestimonials: v }))}
                />
              </div>

              {config.showTestimonials && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground">
                      Depoimentos ({config.testimonialsList.length})
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTestimonial}
                      className="h-7 text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Adicionar
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    {config.testimonialsList.map((t, idx) => (
                      <div key={t.id} className="p-2.5 rounded-xl border border-border bg-background/60 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <Input
                            value={t.name}
                            onChange={(e) => {
                              const next = [...config.testimonialsList];
                              next[idx].name = e.target.value;
                              updateConfig((c) => ({ ...c, testimonialsList: next }));
                            }}
                            placeholder="Nome do cliente"
                            className="h-7 text-xs font-bold"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTestimonial(t.id)}
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <Textarea
                          value={t.text}
                          onChange={(e) => {
                            const next = [...config.testimonialsList];
                            next[idx].text = e.target.value;
                            updateConfig((c) => ({ ...c, testimonialsList: next }));
                          }}
                          placeholder="Depoimento do cliente..."
                          className="min-h-14 text-xs"
                        />
                        <Input
                          value={t.role || ""}
                          onChange={(e) => {
                            const next = [...config.testimonialsList];
                            next[idx].role = e.target.value;
                            updateConfig((c) => ({ ...c, testimonialsList: next }));
                          }}
                          placeholder="Cargo ou Cidade (ex: Luanda)"
                          className="h-7 text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION: GUARANTEE & SECURITY */}
          {selectedSection === "guarantee" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Exibir Caixa de Garantia</Label>
                  <p className="text-[10px] text-muted-foreground">Mostra dias e termos de reembolso</p>
                </div>
                <Switch
                  checked={config.showGuarantee}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showGuarantee: v }))}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Prazo de Garantia (Dias)</Label>
                <Input
                  type="number"
                  min={0}
                  max={90}
                  value={config.guaranteeDays}
                  onChange={(e) =>
                    updateConfig((c) => ({
                      ...c,
                      guaranteeDays: Number(e.target.value) || 7,
                    }))
                  }
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Texto da Garantia</Label>
                <Textarea
                  value={config.guaranteeText}
                  onChange={(e) => updateConfig((c) => ({ ...c, guaranteeText: e.target.value }))}
                  placeholder="Satisfação 100% garantida ou seu dinheiro de volta..."
                  className="min-h-16 text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Selo Oficial EMIS Verificado</Label>
                  <p className="text-[10px] text-muted-foreground">
                    Garantia de segurança interbancária de Angola
                  </p>
                </div>
                <Switch
                  checked={config.showEmisBadge}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showEmisBadge: v }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Selos SSL & Proteção</Label>
                  <p className="text-[10px] text-muted-foreground">
                    Criptografia 256-bit e dados protegidos
                  </p>
                </div>
                <Switch
                  checked={config.showSecurityBadges}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showSecurityBadges: v }))}
                />
              </div>
            </div>
          )}

          {/* SECTION: SUMMARY & COUPONS */}
          {selectedSection === "summary" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Exibir Resumo do Pedido</Label>
                  <p className="text-[10px] text-muted-foreground">Coluna lateral com detalhes do valor</p>
                </div>
                <Switch
                  checked={config.showOrderSummary}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showOrderSummary: v }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Campo de Cupom de Desconto</Label>
                  <p className="text-[10px] text-muted-foreground">Permite compradores digitarem códigos</p>
                </div>
                <Switch
                  checked={config.showCouponField}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showCouponField: v }))}
                />
              </div>
            </div>
          )}

          {/* SECTION: PRODUCT & BUYER DATA */}
          {(selectedSection === "product" || selectedSection === "buyer_data") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">Exibir Imagem do Produto</Label>
                  <p className="text-[10px] text-muted-foreground">Mostra capa oficial do produto</p>
                </div>
                <Switch
                  checked={config.showProductImage}
                  onCheckedChange={(v) => updateConfig((c) => ({ ...c, showProductImage: v }))}
                />
              </div>

              <div className="p-3 rounded-xl bg-secondary/40 border border-border text-xs leading-relaxed text-muted-foreground">
                Os dados do comprador (Nome, E-mail de entrega e Telefone/WhatsApp) são campos
                essenciais para a emissão automática do acesso ao produto e confirmação pela rede
                bancária de Angola.
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
