import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { auth } from "@/lib/firebase-config";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window !== "undefined") {
      await auth.authStateReady();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw redirect({ to: "/auth" });
      }
      return { user: currentUser };
    }
    return { user: null };
  },
  component: () => <Outlet />,
});
