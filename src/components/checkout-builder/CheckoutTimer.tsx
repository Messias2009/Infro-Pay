import { useState, useEffect } from "react";
import { Clock, Flame, Zap } from "lucide-react";

interface CheckoutTimerProps {
  initialMinutes?: number;
  urgencyText?: string;
  color?: "gold" | "red" | "orange" | "emerald" | "purple";
  className?: string;
}

export function CheckoutTimer({
  initialMinutes = 15,
  urgencyText = "Esta oferta especial expira em:",
  color = "gold",
  className = "",
}: CheckoutTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const colorStyles = {
    gold: {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      pill: "bg-amber-500 text-slate-950 font-black",
      icon: "text-amber-400",
    },
    red: {
      bg: "bg-red-500/10 border-red-500/30 text-red-300 animate-pulse",
      pill: "bg-red-600 text-white font-black",
      icon: "text-red-400",
    },
    orange: {
      bg: "bg-orange-500/10 border-orange-500/30 text-orange-300",
      pill: "bg-orange-500 text-slate-950 font-black",
      icon: "text-orange-400",
    },
    emerald: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      pill: "bg-emerald-500 text-slate-950 font-black",
      icon: "text-emerald-400",
    },
    purple: {
      bg: "bg-purple-500/10 border-purple-500/30 text-purple-300",
      pill: "bg-purple-600 text-white font-black",
      icon: "text-purple-400",
    },
  }[color] || {
    bg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    pill: "bg-amber-500 text-slate-950 font-black",
    icon: "text-amber-400",
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border ${colorStyles.bg} transition-all w-full ${className}`}
    >
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide truncate">
        {color === "red" ? (
          <Flame className={`h-4 w-4 shrink-0 ${colorStyles.icon}`} />
        ) : color === "orange" ? (
          <Zap className={`h-4 w-4 shrink-0 ${colorStyles.icon}`} />
        ) : (
          <Clock className={`h-4 w-4 shrink-0 ${colorStyles.icon}`} />
        )}
        <span className="truncate">{urgencyText}</span>
      </div>

      <div
        className={`px-3 py-1 rounded-lg text-sm sm:text-base font-mono tracking-widest ${colorStyles.pill} shadow-sm shrink-0`}
      >
        {formattedTime}
      </div>
    </div>
  );
}
