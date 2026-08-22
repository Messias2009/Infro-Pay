import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore, auth, handleFirestoreError, OperationType } from "@/lib/firebase-config";
import {
  CheckoutCustomizationConfig,
  DEFAULT_CHECKOUT_CONFIG,
  CheckoutModel,
  CheckoutPersonality,
} from "@/types/checkout-builder";

const LOCAL_STORAGE_KEY_PREFIX = "infropay_checkout_config_";

export function getPresetForModel(
  model: CheckoutModel,
  current?: Partial<CheckoutCustomizationConfig>,
): Partial<CheckoutCustomizationConfig> {
  switch (model) {
    case "simples":
      return {
        model: "simples",
        personality: "minimalista",
        ctaEnabled: false,
        showOffer: false,
        showCountdown: false,
        showOrderBump: false,
        showBenefits: false,
        showTestimonials: false,
        showBrandLogo: false,
        showTopHeader: true,
        showProductImage: true,
        showGuarantee: true,
        showProtectedPurchase: true,
        showEmisBadge: true,
        showOrderSummary: true,
        bgTheme: "dark_clean",
        cardRadius: "xl",
        buttonRadius: "lg",
        ctaStyle: "minimal",
      };

    case "conversao":
      return {
        model: "conversao",
        personality: "conversao",
        ctaEnabled: true,
        ctaText: "GARANTIR MINHA COMPRA AGORA",
        ctaSubtext: "Acesso imediato e seguro após confirmação",
        ctaStyle: "gradient",
        ctaIcon: "Lock",
        showOffer: false,
        showCountdown: false,
        showOrderBump: true,
        showBenefits: true,
        showTestimonials: true,
        showGuarantee: true,
        showProtectedPurchase: true,
        showEmisBadge: true,
        showOrderSummary: true,
        bgTheme: "dark_clean",
        cardRadius: "2xl",
        buttonRadius: "xl",
      };

    case "oferta":
      return {
        model: "oferta",
        personality: "premium",
        ctaEnabled: true,
        ctaText: "APROVEITAR OFERTA E COMPRAR AGORA",
        ctaSubtext: "Condição especial por tempo limitado",
        ctaStyle: "gold",
        ctaIcon: "Sparkles",
        showOffer: true,
        offerHeadline: "Oferta Especial por Tempo Limitado",
        offerSubtitle: "Desconto promocional aplicado com liberação instantânea",
        showCountdown: true,
        countdownMinutes: 15,
        countdownUrgencyText: "Esta oferta especial expira em:",
        countdownColor: "gold",
        showOrderBump: true,
        showBenefits: true,
        showTestimonials: false,
        showGuarantee: true,
        showProtectedPurchase: true,
        showEmisBadge: true,
        showOrderSummary: true,
        cardRadius: "2xl",
        buttonRadius: "xl",
      };

    case "personalizado":
      return {
        model: "personalizado",
        ...(current || {}),
      };

    default:
      return {};
  }
}

export function getPresetForPersonality(
  personality: CheckoutPersonality,
): Partial<CheckoutCustomizationConfig> {
  switch (personality) {
    case "minimalista":
      return {
        personality: "minimalista",
        bgTheme: "dark_clean",
        cardRadius: "md",
        buttonRadius: "md",
        primaryColor: "#E2E8F0",
        secondaryColor: "#94A3B8",
        ctaStyle: "minimal",
      };

    case "profissional":
      return {
        personality: "profissional",
        bgTheme: "dark_clean",
        cardRadius: "lg",
        buttonRadius: "lg",
        primaryColor: "#2563EB",
        secondaryColor: "#38BDF8",
        ctaStyle: "gradient",
      };

    case "premium":
      return {
        personality: "premium",
        bgTheme: "dark_luxury",
        cardRadius: "2xl",
        buttonRadius: "xl",
        primaryColor: "#F59E0B",
        secondaryColor: "#D97706",
        ctaStyle: "gold",
      };

    case "conversao":
      return {
        personality: "conversao",
        bgTheme: "dark_clean",
        cardRadius: "2xl",
        buttonRadius: "xl",
        primaryColor: "#FF6B00",
        secondaryColor: "#F59E0B",
        ctaStyle: "gradient",
      };

    case "moderno":
      return {
        personality: "moderno",
        bgTheme: "dark_clean",
        cardRadius: "3xl",
        buttonRadius: "full",
        primaryColor: "#8B5CF6",
        secondaryColor: "#EC4899",
        ctaStyle: "glow",
      };

    case "personalizado":
    default:
      return {
        personality: "personalizado",
      };
  }
}

export function buildDefaultConfig(
  sellerId: string,
  productId?: string | null,
): CheckoutCustomizationConfig {
  const configId = productId ? `product_${productId}` : `seller_${sellerId}`;
  return {
    ...DEFAULT_CHECKOUT_CONFIG,
    id: configId,
    sellerId,
    productId: productId || null,
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  };
}

export async function fetchCheckoutConfig(
  sellerId: string,
  productId?: string | null,
  includeDraft: boolean = true,
): Promise<CheckoutCustomizationConfig> {
  const configId = productId ? `product_${productId}` : `seller_${sellerId}`;

  // Check localStorage cache first
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${configId}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (!includeDraft && parsed.status === "draft" && parsed.publishedConfig) {
          return parsed.publishedConfig;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
  }

  // Try Firestore
  try {
    const docRef = doc(firestore, "checkout_configs", configId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as CheckoutCustomizationConfig;
      if (typeof window !== "undefined") {
        localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${configId}`, JSON.stringify(data));
      }
      return data;
    }

    // If specific product doesn't have custom config, fallback to seller's global config
    if (productId && sellerId) {
      const sellerDocRef = doc(firestore, "checkout_configs", `seller_${sellerId}`);
      const sellerSnap = await getDoc(sellerDocRef);
      if (sellerSnap.exists()) {
        const sellerData = sellerSnap.data() as CheckoutCustomizationConfig;
        return {
          ...sellerData,
          id: configId,
          productId,
        };
      }
    }
  } catch (error) {
    console.warn("Could not fetch from Firestore, using default:", error);
  }

  return buildDefaultConfig(sellerId, productId);
}

function sanitizeForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        clean[key] = value.map((item) =>
          item !== null && typeof item === "object" ? sanitizeForFirestore(item) : item,
        );
      } else if (value !== null && typeof value === "object") {
        clean[key] = sanitizeForFirestore(value);
      } else {
        clean[key] = value;
      }
    }
  }
  return clean;
}

export async function saveCheckoutConfig(
  config: CheckoutCustomizationConfig,
  isPublish: boolean = false,
): Promise<CheckoutCustomizationConfig> {
  const updated: CheckoutCustomizationConfig = {
    ...config,
    status: isPublish ? "published" : "draft",
    updatedAt: new Date().toISOString(),
    ...(isPublish ? { publishedAt: new Date().toISOString() } : {}),
  };

  // 1. Cache to local storage immediately
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        `${LOCAL_STORAGE_KEY_PREFIX}${config.id}`,
        JSON.stringify(updated),
      );
    } catch (e) {
      console.warn("Failed to cache in localStorage", e);
    }
  }

  // 2. Persist to Firestore
  try {
    const docRef = doc(firestore, "checkout_configs", config.id);
    const sanitized = sanitizeForFirestore({
      ...updated,
      serverUpdatedAt: serverTimestamp(),
    });
    await setDoc(docRef, sanitized, { merge: true });
  } catch (error) {
    console.warn("Notice saving to Firestore:", error);
    // Don't fail the client flow if local cache succeeded
  }

  return updated;
}

export async function resetCheckoutConfig(
  sellerId: string,
  productId?: string | null,
): Promise<CheckoutCustomizationConfig> {
  const configId = productId ? `product_${productId}` : `seller_${sellerId}`;
  const defaultConfig = buildDefaultConfig(sellerId, productId);

  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}${configId}`);
    } catch {
      // ignore
    }
  }

  try {
    const docRef = doc(firestore, "checkout_configs", configId);
    const sanitized = sanitizeForFirestore({
      ...defaultConfig,
      serverUpdatedAt: serverTimestamp(),
    });
    await setDoc(docRef, sanitized);
  } catch (error) {
    console.warn("Notice resetting in Firestore:", error);
  }

  return defaultConfig;
}
