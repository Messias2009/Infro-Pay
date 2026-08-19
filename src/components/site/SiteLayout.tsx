import type { ReactNode } from "react";
import { Header, HeaderVariant } from "./Header";
import { Footer, FooterVariant } from "./Footer";

export type SiteLayoutVariant = "home" | "loja" | "checkout" | "default";

export function SiteLayout({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: SiteLayoutVariant;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant={variant as HeaderVariant} />
      <main className="flex-1">{children}</main>
      <Footer variant={variant as FooterVariant} />
    </div>
  );
}
