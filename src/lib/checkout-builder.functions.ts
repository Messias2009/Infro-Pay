import { createServerFn } from "@tanstack/react-start";
import {
  fetchCheckoutConfig,
  saveCheckoutConfig,
  resetCheckoutConfig,
} from "./checkout-builder.service";
import type { CheckoutCustomizationConfig } from "@/types/checkout-builder";

export const getCheckoutConfigFn = createServerFn({ method: "GET" })
  .inputValidator(
    (d: { sellerId: string; productId?: string | null; includeDraft?: boolean }) => d,
  )
  .handler(async ({ data }) => {
    return fetchCheckoutConfig(data.sellerId, data.productId, data.includeDraft ?? true);
  });

export const saveCheckoutConfigFn = createServerFn({ method: "POST" })
  .inputValidator(
    (d: { config: CheckoutCustomizationConfig; isPublish: boolean }) => d,
  )
  .handler(async ({ data }) => {
    return saveCheckoutConfig(data.config, data.isPublish);
  });

export const resetCheckoutConfigFn = createServerFn({ method: "POST" })
  .inputValidator((d: { sellerId: string; productId?: string | null }) => d)
  .handler(async ({ data }) => {
    return resetCheckoutConfig(data.sellerId, data.productId);
  });
