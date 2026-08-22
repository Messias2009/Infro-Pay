import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { User as UserIcon, LogOut, ShieldCheck, Lock, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoMark from "@/assets/infropay-mark.png";

export type HeaderVariant = "home" | "loja" | "checkout" | "default";

export function Header({ variant = "default" }: { variant?: HeaderVariant }) {
  const { user, signOut: authSignOut } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function signOut() {
    await authSignOut();
    router.navigate({ to: "/" });
  }

  if (variant === "checkout") {
    return (
      <header className="sticky top-0 z-50 border-b border-border/60 glass w-full">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-center gap-3 sm:gap-6 px-3 sm:px-6 w-full">
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0">
              <div className="absolute inset-0 rounded-lg blur-md gradient-brand opacity-50" />
              <img
                src={logoMark}
                alt="InfroPay"
                width={512}
                height={512}
                className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-base sm:text-lg font-bold tracking-tight">
                Infro<span className="text-gradient-gold">Pay</span>
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground -mt-0.5 font-medium">
                Checkout Seguro
              </div>
            </div>
          </div>

          <div className="h-5 w-[1px] bg-border/80" />

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-card/80 border border-border/60 rounded-full px-2.5 sm:px-3.5 py-1.5 shadow-sm shrink-0">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
              <Lock className="h-3 w-3 text-primary shrink-0" /> SSL 256-bit
            </span>
          </div>
        </div>
      </header>
    );
  }

  if (variant === "loja") {
    return (
      <header className="sticky top-0 z-50 border-b border-border/60 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-lg blur-md gradient-brand opacity-50 group-hover:opacity-100 transition" />
              <img
                src={logoMark}
                alt="InfroPay"
                width={512}
                height={512}
                className="relative h-9 w-9 rounded-lg object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold tracking-tight">
                Infro<span className="text-gradient-gold">Pay</span>
              </div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">Loja Oficial</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link
              to="/loja"
              className="px-3 py-2 rounded-md font-semibold text-foreground bg-accent/40"
            >
              Todos os produtos
            </Link>
            <Link
              to="/loja"
              search={{ cat: "cursos" }}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
            >
              Cursos
            </Link>
            <Link
              to="/loja"
              search={{ cat: "ebooks" }}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
            >
              Ebooks
            </Link>
            <Link
              to="/loja"
              search={{ cat: "templates" }}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
            >
              Templates
            </Link>
            <Link
              to="/loja"
              search={{ cat: "mentorias" }}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
            >
              Mentorias
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link to="/produtor">
                  <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                    Painel
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <UserIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem disabled className="text-xs">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/produtor">Painel do produtor</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link to="/auth" search={{ mode: "signup" }}>
                  <Button
                    size="sm"
                    className="gradient-brand text-primary-foreground shadow-glow hover:opacity-90"
                  >
                    Vender
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Home / Platform Institutional Header
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-lg blur-md gradient-brand opacity-50 group-hover:opacity-100 transition" />
            <img
              src={logoMark}
              alt="InfroPay"
              width={512}
              height={512}
              className="relative h-9 w-9 rounded-lg object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight">
              Infro<span className="text-gradient-gold">Pay</span>
            </div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">
              plataforma para produtores
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-foreground font-medium hover:bg-accent/40 transition"
          >
            Início
          </Link>
          <a
            href="/#como-funciona"
            className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
          >
            Como funciona
          </a>
          <a
            href="/#recursos"
            className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
          >
            Recursos
          </a>
          <a
            href="/#produtores"
            className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
          >
            Para produtores
          </a>
          <a
            href="/#faq"
            className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
          >
            FAQ
          </a>
          <Link
            to="/contactos"
            className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition"
          >
            Contactos
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {user ? (
            <>
              <Link to="/produtor">
                <Button variant="outline" size="sm" className="font-semibold">
                  Painel do Produtor
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem disabled className="text-xs">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/produtor">Painel de Vendas</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/produtor/produtos">Meus Produtos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/produtor/saques">Financeiro & Saques</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="font-medium">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth" search={{ mode: "signup" }}>
                <Button
                  size="sm"
                  className="gradient-brand text-primary-foreground shadow-glow hover:opacity-90 font-medium px-4"
                >
                  Começar agora
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 sm:hidden">
          {user ? (
            <Link to="/produtor">
              <Button size="sm" variant="outline" className="h-9 px-3 text-xs">
                Painel
              </Button>
            </Link>
          ) : (
            <Link to="/auth" search={{ mode: "signup" }}>
              <Button size="sm" className="gradient-brand text-primary-foreground text-xs h-9 px-3">
                Começar
              </Button>
            </Link>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[320px] p-6 flex flex-col justify-between"
            >
              <div>
                <SheetHeader className="text-left pb-4 border-b border-border/60">
                  <SheetTitle className="flex items-center gap-2 text-base">
                    <img
                      src={logoMark}
                      alt="InfroPay"
                      width={32}
                      height={32}
                      className="h-7 w-7 rounded-md object-contain"
                    />
                    <span>
                      Infro<span className="text-gold">Pay</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-2 mt-6">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg font-medium text-foreground hover:bg-accent/50 transition"
                  >
                    <span>Início</span>
                  </Link>
                  <a
                    href="/#como-funciona"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition"
                  >
                    <span>Como funciona</span>
                  </a>
                  <a
                    href="/#recursos"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition"
                  >
                    <span>Recursos</span>
                  </a>
                  <a
                    href="/#produtores"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition"
                  >
                    <span>Para produtores</span>
                  </a>
                  <a
                    href="/#faq"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition"
                  >
                    <span>FAQ</span>
                  </a>
                  <Link
                    to="/contactos"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition"
                  >
                    <span>Contactos</span>
                  </Link>
                  <div className="my-2 border-t border-border/40 pt-2 flex flex-col gap-1">
                    <Link
                      to="/termos"
                      onClick={() => setMobileOpen(false)}
                      className="px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Termos de Uso
                    </Link>
                    <Link
                      to="/privacidade"
                      onClick={() => setMobileOpen(false)}
                      className="px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Política de Privacidade
                    </Link>
                  </div>
                </nav>
              </div>

              <div className="pt-6 border-t border-border/60 space-y-2.5">
                {user ? (
                  <>
                    <div className="text-xs text-muted-foreground truncate px-1">{user.email}</div>
                    <Link
                      to="/produtor"
                      onClick={() => setMobileOpen(false)}
                      className="w-full block"
                    >
                      <Button className="w-full gradient-brand text-primary-foreground">
                        Acessar Painel
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => {
                        setMobileOpen(false);
                        signOut();
                      }}
                    >
                      <LogOut className="h-3.5 w-3.5 mr-1.5" />
                      Sair da conta
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setMobileOpen(false)} className="w-full block">
                      <Button variant="outline" className="w-full">
                        Entrar na conta
                      </Button>
                    </Link>
                    <Link
                      to="/auth"
                      search={{ mode: "signup" }}
                      onClick={() => setMobileOpen(false)}
                      className="w-full block"
                    >
                      <Button className="w-full gradient-brand text-primary-foreground shadow-glow">
                        Começar agora <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
