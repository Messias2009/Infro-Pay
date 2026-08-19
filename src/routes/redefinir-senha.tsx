import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroBg from "@/assets/hero-banner.jpg";
import logoMark from "@/assets/infropay-mark.png";

export const Route = createFileRoute("/redefinir-senha")({
  head: () => ({
    meta: [
      { title: "Definir Nova Senha — InfroPay" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RedefinirSenhaPage,
});

function RedefinirSenhaPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      try {
        // Handle PKCE code in query if present
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get("code");
          const errorParam = urlParams.get("error");
          const errorDesc = urlParams.get("error_description");

          if (errorParam || errorDesc) {
            if (isMounted) {
              setErrorMessage(errorDesc || "O link de recuperação é inválido ou já foi utilizado.");
              setHasValidSession(false);
              setChecking(false);
            }
            return;
          }

          if (code) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              console.warn("Falha na troca do código de recuperação:", exchangeError);
            }
          }
        }

        // Check if there is an active session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (isMounted) {
          if (session) {
            setHasValidSession(true);
            setErrorMessage(null);
          } else {
            // Listen for recovery state event
            const { data: authListener } = supabase.auth.onAuthStateChange(
              (event, currentSession) => {
                if (
                  (event === "PASSWORD_RECOVERY" ||
                    event === "SIGNED_IN" ||
                    event === "USER_UPDATED") &&
                  currentSession
                ) {
                  if (isMounted) {
                    setHasValidSession(true);
                    setErrorMessage(null);
                    setChecking(false);
                  }
                }
              },
            );

            // Timeout after 1.5s if no session resolved
            setTimeout(() => {
              if (isMounted) {
                setChecking(false);
              }
            }, 1500);

            return () => {
              authListener.subscription.unsubscribe();
            };
          }
        }
      } catch (err) {
        if (isMounted) {
          setErrorMessage("Ocorreu um erro ao verificar o seu link de recuperação.");
          setHasValidSession(false);
        }
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    }

    void initSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    if (!password) {
      toast.error("Por favor, introduza a nova palavra-passe.");
      return;
    }

    if (password.length < 8) {
      toast.error("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("A confirmação de palavra-passe não coincide.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      // Sign out recovery session to invalidate one-time use token and clean up old sessions
      await supabase.auth.signOut();

      setSuccess(true);
      toast.success("Senha alterada com sucesso!");
    } catch (err) {
      const msg = (err as Error)?.message || "Não foi possível alterar a sua palavra-passe.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative grid lg:grid-cols-2 bg-background text-foreground">
      {/* Visual Brand Column */}
      <div className="relative hidden lg:block overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/75 to-background/95" />
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full gradient-gold opacity-20 blur-3xl" />
        <div className="relative h-full p-12 flex flex-col justify-between">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img
              src={logoMark}
              alt="InfroPay"
              width={512}
              height={512}
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="text-xl font-bold">
              Infro<span className="text-gradient-gold">Pay</span>
            </span>
          </Link>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-4 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Recuperação Segura de Conta
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight max-w-md">
              A sua segurança e a do seu negócio são a nossa{" "}
              <span className="text-gradient-gold">prioridade</span>.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md text-sm leading-relaxed">
              Crie uma palavra-passe forte com letras e números para garantir a máxima proteção das
              suas vendas e saldos.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} InfroPay</div>
        </div>
      </div>

      {/* Action Content Column */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
            <img
              src={logoMark}
              alt="InfroPay"
              width={512}
              height={512}
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span className="text-lg font-bold">
              Infro<span className="text-gradient-gold">Pay</span>
            </span>
          </Link>

          {checking ? (
            <div className="p-8 text-center space-y-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm">
              <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">
                A validar ligação segura de recuperação...
              </p>
            </div>
          ) : success ? (
            <div className="space-y-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Senha alterada com sucesso!
                </h1>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  A sua nova palavra-passe foi atualizada com sucesso e as sessões anteriores foram
                  encerradas por motivos de segurança.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => router.navigate({ to: "/auth", search: { mode: "signin" } })}
                  className="w-full h-11 gradient-brand text-primary-foreground shadow-glow font-medium"
                >
                  Entrar na plataforma
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : !hasValidSession ? (
            <div className="space-y-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <AlertCircle className="h-8 w-8" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Link de recuperação inválido ou expirado
                </h1>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {errorMessage ||
                    "Por motivos de segurança, os links de redefinição de palavra-passe são de uso único e expiram rapidamente. Solicite um novo link para continuar."}
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  onClick={() => router.navigate({ to: "/auth", search: { mode: "forgot" } })}
                  className="w-full h-11 gradient-brand text-primary-foreground shadow-glow font-medium"
                >
                  Solicitar novo link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => router.navigate({ to: "/auth", search: { mode: "signin" } })}
                  className="w-full text-muted-foreground hover:text-foreground text-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para o login
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-medium mb-3">
                  <KeyRound className="h-3.5 w-3.5" />
                  Redefinição de Acesso
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Definir nova senha</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Introduza a sua nova palavra-passe para aceder à sua conta InfroPay.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <Label htmlFor="new-password">Nova palavra-passe</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="pl-9 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirmar nova palavra-passe</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirm ? "text" : "password"}
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a nova palavra-passe"
                      className="pl-9 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      As palavras-passe não coincidem.
                    </p>
                  )}
                </div>

                <div className="rounded-lg bg-secondary/40 border border-border/50 p-3 text-xs text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Recomendações de segurança:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li className={password.length >= 8 ? "text-emerald-400 font-medium" : ""}>
                      Pelo menos 8 caracteres
                    </li>
                    <li className={/[0-9]/.test(password) ? "text-emerald-400 font-medium" : ""}>
                      Pelo menos um número
                    </li>
                    <li className={/[a-zA-Z]/.test(password) ? "text-emerald-400 font-medium" : ""}>
                      Pelo menos uma letra
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !password || password !== confirmPassword}
                  className="w-full h-11 gradient-brand text-primary-foreground shadow-glow font-medium"
                >
                  {loading ? "A atualizar palavra-passe..." : "Alterar senha"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </form>

              <div className="text-center">
                <Link
                  to="/auth"
                  search={{ mode: "signin" }}
                  className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Voltar para o login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
