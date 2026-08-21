import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroBg from "@/assets/hero-banner.jpg";
import logoMark from "@/assets/infropay-mark.png";

const search = z.object({ mode: z.enum(["signin", "signup", "forgot"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({
    meta: [{ title: "Entrar — InfroPay" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const router = useRouter();
  const searchParams = Route.useSearch();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(searchParams.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Sync mode if search param changes
  useEffect(() => {
    if (searchParams.mode) {
      setMode(searchParams.mode);
    }
  }, [searchParams.mode]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        await signUpWithEmail(email.trim(), password, name.trim());
        toast.success("Conta criada e perfil sincronizado com sucesso!");
        router.navigate({ to: "/produtor" });
      } else if (mode === "signin") {
        await signInWithEmail(email.trim(), password);
        toast.success("Bem-vindo de volta!");
        router.navigate({ to: "/produtor" });
      } else if (mode === "forgot") {
        if (!email.trim()) {
          toast.error("Por favor, introduza o seu endereço de e-mail.");
          return;
        }

        try {
          await resetPassword(email.trim());
        } catch (recoveryErr) {
          console.warn("Informação de recuperação de senha:", recoveryErr);
        }

        // Generic response to strictly prevent user enumeration
        setForgotSent(true);
        toast.success("Pedido de recuperação processado.");
      }
    } catch (err: any) {
      let msg = err?.message || "Ocorreu um erro na autenticação.";
      if (
        msg.includes("auth/invalid-credential") ||
        msg.includes("auth/wrong-password") ||
        msg.includes("auth/user-not-found")
      ) {
        msg = "Credenciais inválidas. Verifique o seu e-mail e senha.";
      } else if (msg.includes("auth/email-already-in-use")) {
        msg = "Este e-mail já se encontra registado. Tente iniciar sessão.";
      } else if (msg.includes("auth/weak-password")) {
        msg = "A palavra-passe deve ter pelo menos 6 caracteres.";
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Bem-vindo à InfroPay!");
      router.navigate({ to: "/produtor" });
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        toast.error(err?.message || "Falha na autenticação com Google.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative grid lg:grid-cols-2 bg-background text-foreground">
      {/* Left Marketing / Branding Column */}
      <div className="relative hidden lg:block overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/70 to-background/95" />
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
            <h2 className="font-display text-4xl font-bold leading-tight max-w-md">
              A plataforma onde o seu <span className="text-gradient-gold">conhecimento</span> vira
              renda.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md text-sm leading-relaxed">
              Checkout de alta conversão, pagamentos locais Multicaixa GPO e internacionais, painel
              completo. Sem complicação técnica.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} InfroPay</div>
        </div>
      </div>

      {/* Right Action Column */}
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

          {mode === "forgot" ? (
            /* Forgot Password View */
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-medium mb-3">
                  <KeyRound className="h-3.5 w-3.5" />
                  Recuperação de Senha
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Recuperar senha</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Introduza o endereço de e-mail associado à sua conta para enviarmos o link seguro
                  de redefinição.
                </p>
              </div>

              {forgotSent ? (
                <div className="space-y-5 rounded-2xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        Pedido de recuperação enviado
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Se este e-mail estiver cadastrado, você receberá um link para redefinir sua
                        senha.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-background/50 border border-border/40 p-3 text-xs text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">Não recebeu o e-mail?</p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      <li>Verifique a caixa de Spam ou Lixo Eletrónico.</li>
                      <li>Aguarde alguns instantes e confirme se digitou o e-mail correto.</li>
                    </ul>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setForgotSent(false)}
                      className="w-full text-xs h-10 border-border/60"
                    >
                      Tentar outro e-mail
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setMode("signin")}
                      className="w-full h-11 gradient-brand text-primary-foreground shadow-glow font-medium"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar para o login
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEmail} className="space-y-4">
                  <div>
                    <Label htmlFor="forgot-email">E-mail da sua conta</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="forgot-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@email.com"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="w-full h-11 gradient-brand text-primary-foreground shadow-glow font-medium"
                  >
                    {loading ? "A enviar link..." : "Enviar link de recuperação"}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setMode("signin")}
                      className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                      Voltar para o login
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Sign In / Sign Up Views */
            <>
              <h1 className="text-3xl font-bold tracking-tight">
                {mode === "signup" ? "Criar conta" : "Bem-vindo de volta"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {mode === "signup" ? "Comece a vender em minutos." : "Aceda ao seu painel."}
              </p>

              <Button
                onClick={handleGoogle}
                variant="outline"
                className="w-full mt-8 h-11"
                disabled={loading}
              >
                <GoogleIcon className="h-4 w-4 mr-2" />
                Continuar com Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="bg-background px-3 text-muted-foreground">ou</span>
                </div>
              </div>

              <form onSubmit={handleEmail} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="O seu nome"
                      className="mt-1.5"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@email.com"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Palavra-passe</Label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => {
                          setForgotSent(false);
                          setMode("forgot");
                        }}
                        className="text-xs text-primary-glow hover:underline transition-colors font-medium"
                      >
                        Esqueceu sua senha?
                      </button>
                    )}
                  </div>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 gradient-brand text-primary-foreground shadow-glow"
                >
                  {loading ? "A processar..." : mode === "signup" ? "Criar conta" : "Entrar"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </form>

              <p className="mt-6 text-sm text-center text-muted-foreground">
                {mode === "signup" ? "Já tem conta?" : "Ainda não tem conta?"}{" "}
                <button
                  onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                  className="text-primary-glow hover:underline font-medium"
                >
                  {mode === "signup" ? "Entrar" : "Criar conta"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
