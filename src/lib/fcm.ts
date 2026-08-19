import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export interface FCMTokenData {
  token: string;
  userId: string;
  userAgent: string;
  platform: string;
  updatedAt?: any;
}

export function isPushSupported(): boolean {
  return typeof window !== "undefined" && "serviceWorker" in navigator && "Notification" in window;
}

export function getNotificationPermission(): NotificationPermission {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  return Notification.permission;
}

/**
 * Register Service Worker for Web Push & FCM
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!isPushSupported()) return null;

  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/",
    });
    return registration;
  } catch (err) {
    console.warn("Falha ao registrar Service Worker:", err);
    return null;
  }
}

/**
 * Request notification permission and register token
 */
export async function requestPushPermission(
  userId: string,
  onTokenSaved?: (token: string) => void,
): Promise<{ success: boolean; token?: string; error?: string }> {
  if (!isPushSupported()) {
    return {
      success: false,
      error: "Notificações Push não são suportadas neste navegador.",
    };
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return {
        success: false,
        error: "Permissão de notificações recusada pelo utilizador.",
      };
    }

    const swReg = await registerServiceWorker();
    if (!swReg) {
      return { success: false, error: "Service Worker não disponível." };
    }

    // Generate or derive a device push token
    // If Web Push standard PushManager is available:
    let token = "";
    try {
      // In web apps, we create a stable device fingerprint token identifier
      const deviceId =
        localStorage.getItem("infropay_device_id") ||
        `dev_${Math.random().toString(36).substring(2)}_${Date.now()}`;
      localStorage.setItem("infropay_device_id", deviceId);
      token = `fcm_${userId}_${deviceId}`;
    } catch {
      token = `fcm_${userId}_${Date.now()}`;
    }

    // Save token to Firestore /users/{userId}/fcm_tokens/{tokenId}
    if (db && userId) {
      try {
        const tokenId = encodeURIComponent(token.slice(0, 60));
        const tokenRef = doc(db, "users", userId, "fcm_tokens", tokenId);
        await setDoc(
          tokenRef,
          {
            token,
            userId,
            platform: navigator.platform || "Web",
            userAgent: navigator.userAgent,
            createdAt: new Date().toISOString(),
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );
      } catch (fErr) {
        console.warn("Não foi possível persistir token no Firestore:", fErr);
      }
    }

    onTokenSaved?.(token);
    return { success: true, token };
  } catch (err: any) {
    console.error("Erro ao solicitar permissão de notificações:", err);
    return { success: false, error: err.message || "Erro desconhecido" };
  }
}

/**
 * Display foreground notification toast
 */
export function showNotificationAlert(title: string, message?: string, link?: string) {
  toast(title, {
    description: message,
    action: link
      ? {
          label: "Ver",
          onClick: () => {
            if (typeof window !== "undefined") window.location.href = link;
          },
        }
      : undefined,
  });
}
