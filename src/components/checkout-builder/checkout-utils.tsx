import React from "react";
import {
  Lock,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ShoppingCart,
  Sparkles,
  Flame,
  CreditCard,
  Star,
  Award,
  BookOpen,
  Clock,
  Heart,
  Gift,
  HelpCircle,
} from "lucide-react";
import type {
  CheckoutCtaIcon,
  CheckoutCardRadius,
  CheckoutButtonRadius,
  CheckoutCtaStyle,
} from "@/types/checkout-builder";

export function renderCtaIcon(iconName: CheckoutCtaIcon, className: string = "h-4 w-4 shrink-0") {
  switch (iconName) {
    case "Lock":
      return <Lock className={className} />;
    case "Zap":
      return <Zap className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "CheckCircle2":
      return <CheckCircle2 className={className} />;
    case "ArrowRight":
      return <ArrowRight className={className} />;
    case "ShoppingCart":
      return <ShoppingCart className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Flame":
      return <Flame className={className} />;
    case "CreditCard":
      return <CreditCard className={className} />;
    default:
      return <Lock className={className} />;
  }
}

export function renderBenefitIcon(iconName: string, className: string = "h-4 w-4 shrink-0") {
  switch (iconName) {
    case "Zap":
      return <Zap className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "CheckCircle2":
      return <CheckCircle2 className={className} />;
    case "Star":
      return <Star className={className} />;
    case "Award":
      return <Award className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    case "Clock":
      return <Clock className={className} />;
    case "Heart":
      return <Heart className={className} />;
    case "Gift":
      return <Gift className={className} />;
    default:
      return <CheckCircle2 className={className} />;
  }
}

export function getCardRadiusClass(radius: CheckoutCardRadius): string {
  switch (radius) {
    case "none":
      return "rounded-none";
    case "sm":
      return "rounded-sm";
    case "md":
      return "rounded-md";
    case "lg":
      return "rounded-lg";
    case "xl":
      return "rounded-xl";
    case "2xl":
      return "rounded-2xl";
    case "3xl":
      return "rounded-3xl";
    case "full":
      return "rounded-3xl";
    default:
      return "rounded-2xl";
  }
}

export function getButtonRadiusClass(radius: CheckoutButtonRadius): string {
  switch (radius) {
    case "none":
      return "rounded-none";
    case "sm":
      return "rounded-sm";
    case "md":
      return "rounded-md";
    case "lg":
      return "rounded-lg";
    case "xl":
      return "rounded-xl";
    case "full":
      return "rounded-full";
    default:
      return "rounded-xl";
  }
}

export function getCtaStyleClasses(
  style: CheckoutCtaStyle,
  primaryColor?: string,
): { container: string; text: string } {
  switch (style) {
    case "gradient":
      return {
        container: "gradient-brand text-primary-foreground shadow-glow hover:brightness-110",
        text: "text-white font-black tracking-wide",
      };
    case "gold":
      return {
        container: "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-black shadow-lg hover:brightness-105",
        text: "text-slate-950 font-black tracking-wide",
      };
    case "emerald":
      return {
        container: "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white font-black shadow-lg hover:brightness-110",
        text: "text-white font-black tracking-wide",
      };
    case "glow":
      return {
        container: "bg-primary text-primary-foreground ring-4 ring-primary/30 shadow-[0_0_25px_rgba(255,107,0,0.5)] hover:brightness-110",
        text: "text-white font-black tracking-wide",
      };
    case "outline":
      return {
        container: "border-2 border-primary bg-primary/10 text-primary hover:bg-primary/20",
        text: "text-primary font-bold tracking-wide",
      };
    case "minimal":
    default:
      return {
        container: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        text: "text-white font-bold tracking-normal",
      };
  }
}
