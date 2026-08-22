export type CheckoutModel = "simples" | "conversao" | "oferta" | "personalizado";

export type CheckoutPersonality =
  | "minimalista"
  | "profissional"
  | "premium"
  | "conversao"
  | "moderno"
  | "personalizado";

export type CheckoutCtaStyle =
  | "gradient"
  | "gold"
  | "emerald"
  | "minimal"
  | "glow"
  | "outline";

export type CheckoutCtaPosition = "standard" | "top_bottom" | "sticky_bottom";

export type CheckoutCtaIcon =
  | "Lock"
  | "Zap"
  | "ShieldCheck"
  | "CheckCircle2"
  | "ArrowRight"
  | "ShoppingCart"
  | "Sparkles"
  | "Flame"
  | "CreditCard";

export type CheckoutCardRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
export type CheckoutButtonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type CheckoutBgTheme =
  | "dark_clean"
  | "dark_luxury"
  | "light_modern"
  | "light_minimal"
  | "custom";

export interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  rating: number;
  text: string;
  location?: string;
}

export interface CheckoutCustomizationConfig {
  id: string;
  sellerId: string;
  productId?: string | null; // null = global account checkout
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;

  // 1. Model & Preset Personality
  model: CheckoutModel;
  personality: CheckoutPersonality;

  // 2. Visual Identity & Theme
  brandName?: string | null;
  brandLogoUrl?: string | null;
  showBrandLogo: boolean;
  showInfropayBadge: boolean;
  bgTheme: CheckoutBgTheme;
  customBgColor?: string;
  customCardBgColor?: string;
  customTextColor?: string;
  primaryColor: string;
  secondaryColor: string;
  cardRadius: CheckoutCardRadius;
  buttonRadius: CheckoutButtonRadius;

  // 3. CTA Customization
  ctaEnabled: boolean;
  ctaText: string;
  ctaSubtext?: string;
  ctaIcon: CheckoutCtaIcon;
  ctaPosition: CheckoutCtaPosition;
  ctaStyle: CheckoutCtaStyle;
  ctaColor?: string;
  ctaTextColor?: string;

  // 4. Offer & Countdown Timer
  showOffer: boolean;
  offerHeadline: string;
  offerSubtitle: string;
  showCountdown: boolean;
  countdownMinutes: number;
  countdownUrgencyText: string;
  countdownColor: "gold" | "red" | "orange" | "emerald" | "purple";

  // 5. Payment Methods
  paymentMethods: {
    multicaixa_express: boolean;
    referencia: boolean;
    transferencia: boolean;
  };
  defaultPaymentMethod: "multicaixa_express" | "referencia" | "transferencia";

  // 6. Optional Toggle Switches & Content
  showTopHeader: boolean;
  showProductImage: boolean;
  showOrderBump: boolean;
  showBenefits: boolean;
  benefitsList: BenefitItem[];
  showTestimonials: boolean;
  testimonialsList: TestimonialItem[];
  showGuarantee: boolean;
  guaranteeDays: number;
  guaranteeText: string;
  showProtectedPurchase: boolean;
  showEmisBadge: boolean;
  showOrderSummary: boolean;
  showCouponField: boolean;
  showSecurityBadges: boolean;
  customFooterText?: string;
}

export const DEFAULT_CHECKOUT_CONFIG: Omit<CheckoutCustomizationConfig, "id" | "sellerId" | "createdAt" | "updatedAt"> = {
  status: "published",
  model: "conversao",
  personality: "conversao",
  brandName: "",
  brandLogoUrl: "",
  showBrandLogo: false,
  showInfropayBadge: true,
  bgTheme: "dark_clean",
  primaryColor: "#FF6B00",
  secondaryColor: "#EAB308",
  cardRadius: "2xl",
  buttonRadius: "xl",

  ctaEnabled: true,
  ctaText: "GARANTIR MINHA COMPRA AGORA",
  ctaSubtext: "Acesso imediato e seguro após confirmação",
  ctaIcon: "Lock",
  ctaPosition: "standard",
  ctaStyle: "gradient",
  ctaColor: "#FF6B00",
  ctaTextColor: "#FFFFFF",

  showOffer: false,
  offerHeadline: "Oferta Especial por Tempo Limitado",
  offerSubtitle: "Aproveite esta condição promocional exclusiva",
  showCountdown: false,
  countdownMinutes: 15,
  countdownUrgencyText: "Esta oferta especial expira em:",
  countdownColor: "gold",

  paymentMethods: {
    multicaixa_express: true,
    referencia: true,
    transferencia: true,
  },
  defaultPaymentMethod: "multicaixa_express",

  showTopHeader: true,
  showProductImage: true,
  showOrderBump: true,
  showBenefits: true,
  benefitsList: [
    {
      id: "b1",
      icon: "Zap",
      title: "Acesso Imediato",
      desc: "Receba o produto no seu e-mail e WhatsApp logo após a confirmação.",
    },
    {
      id: "b2",
      icon: "ShieldCheck",
      title: "Garantia Incondicional",
      desc: "Satisfação garantida ou seu dinheiro de volta sem complicações.",
    },
    {
      id: "b3",
      icon: "CheckCircle2",
      title: "Suporte Especializado",
      desc: "Equipe de apoio disponível para sanar dúvidas e orientar você.",
    },
  ],
  showTestimonials: false,
  testimonialsList: [
    {
      id: "t1",
      name: "Manuel Fernandes",
      role: "Empreendedor em Luanda",
      rating: 5,
      text: "Excelente conteúdo! Processo de compra super rápido pelo Multicaixa Express e acesso imediato.",
    },
  ],
  showGuarantee: true,
  guaranteeDays: 7,
  guaranteeText: "Satisfação 100% garantida ou seu dinheiro de volta dentro do prazo legal.",
  showProtectedPurchase: true,
  showEmisBadge: true,
  showOrderSummary: true,
  showCouponField: false,
  showSecurityBadges: true,
  customFooterText: "",
};
