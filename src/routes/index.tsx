import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Users,
  CheckCircle2,
  Layers,
  ShoppingBag,
  CreditCard,
  Link as LinkIcon,
  BarChart3,
  HelpCircle,
  Lock,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  FileCode,
  Briefcase,
  Target,
  Wrench,
  Flame,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TrustMarquee } from "@/components/site/TrustMarquee";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/CountUp";
import heroBg from "@/assets/hero-premium.jpg";
import bannerProdutores from "@/assets/banner-produtores.jpg";
import dashboardImg from "@/assets/dashboard-preview.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InfroPay — Plataforma de Vendas para Produtores Digitais" },
      {
        name: "description",
        content:
          "Venda seus produtos digitais com a InfroPay. Crie seu produto, gere seu link de venda e envie diretamente para os seus clientes em Angola.",
      },
      {
        property: "og:title",
        content: "InfroPay — Plataforma de Vendas para Produtores Digitais",
      },
      {
        property: "og:description",
        content:
          "Crie seu produto, gere seu link de venda e receba pagamentos em Kwanza com Multicaixa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout variant="home">
      {/* 1. HERO SECTION (Fully responsive, no overflow, mobile tested) */}
      <section className="relative overflow-hidden w-full max-w-full min-w-0 box-border">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_60%)] opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32 min-w-0">
          <div className="max-w-3xl min-w-0">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-foreground/90 border border-gold/30 shadow-sm max-w-full">
              <span className="h-2 w-2 rounded-full bg-gold shrink-0 animate-pulse" />
              <span className="truncate">Infraestrutura de vendas para criadores</span>
            </div>

            {/* Main title */}
            <h1 className="mt-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] text-foreground break-words min-w-0">
              Venda seus produtos digitais com a{" "}
              <span className="text-gradient-gold">InfroPay</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl break-words min-w-0">
              Crie seu produto, gere seu link de venda e envie diretamente para os seus clientes.
              Receba pagamentos com Multicaixa Express, acompanhe pedidos em tempo real e saque seus
              ganhos com rapidez.
            </p>

            {/* CTAs */}
            <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link to="/auth" search={{ mode: "signup" }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gradient-brand text-primary-foreground shadow-glow hover:opacity-95 h-12 px-7 font-bold text-sm sm:text-base"
                >
                  Começar agora <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </Link>
              <Link to="/auth" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-7 font-semibold border-border/80 hover:bg-accent/60 text-sm sm:text-base"
                >
                  Entrar na conta
                </Button>
              </Link>
            </div>

            {/* Highlight stats */}
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2.5 sm:gap-6 max-w-lg border-t border-border/60 pt-5 sm:pt-6 min-w-0">
              <div className="min-w-0">
                <div className="font-display text-xl sm:text-3xl font-bold text-gradient-gold truncate">
                  2%
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                  Taxa por venda
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl sm:text-3xl font-bold text-foreground truncate">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                  Controle total
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl sm:text-3xl font-bold text-gold truncate">
                  1h
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                  Liberação rápida
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMO FUNCIONA (Venda em poucos passos) */}
      <section
        id="como-funciona"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 scroll-mt-20 min-w-0"
      >
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 min-w-0">
          <div className="text-xs font-bold uppercase tracking-widest text-gold">Como funciona</div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words">
            Venda em poucos passos
          </h2>
          <p className="mt-3 text-xs sm:text-base text-muted-foreground break-words">
            Tudo o que você precisa para começar a faturar com produtos digitais em Angola sem
            complicação técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-0">
          {[
            {
              step: "01",
              title: "Crie sua conta",
              desc: "Cadastre-se gratuitamente e configure o seu perfil em menos de 1 minuto.",
              icon: Users,
            },
            {
              step: "02",
              title: "Cadastre seu produto",
              desc: "Adicione nome, imagem, descrição, preço e ficheiros ou aulas do seu infoproduto.",
              icon: ShoppingBag,
            },
            {
              step: "03",
              title: "Gere seu link",
              desc: "A plataforma cria automaticamente o link exclusivo da página de venda/checkout.",
              icon: LinkIcon,
            },
            {
              step: "04",
              title: "Compartilhe",
              desc: "Copie o link e envie para seus clientes através do WhatsApp, redes sociais ou anúncios.",
              icon: ArrowUpRight,
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-gold/50 transition-all duration-300 group min-w-0"
              >
                <div className="absolute top-4 right-4 text-3xl sm:text-4xl font-display font-black text-foreground/5 select-none group-hover:text-gold/10 transition">
                  {s.step}
                </div>
                <div>
                  <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl gradient-brand grid place-items-center mb-4 sm:mb-5 text-primary-foreground shadow-md">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-gold tracking-wider">
                    ETAPA {s.step}
                  </div>
                  <h3 className="mt-1 text-base sm:text-lg font-bold text-foreground break-words">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DASHBOARD DO PRODUTOR */}
      <section
        id="produtores"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 min-w-0"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 min-w-0">
          <div className="text-xs font-bold uppercase tracking-widest text-gold">
            Painel de Gestão
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words">
            Tenha tudo sob controle em um único painel.
          </h2>
          <p className="mt-3 text-xs sm:text-base text-muted-foreground break-words">
            Acompanhe vendas, faturamento, pedidos, comissões, saldo liberado e desempenho do seu
            negócio em tempo real.
          </p>
        </div>

        {/* Dashboard Visual Preview */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-border/90 bg-card p-3 sm:p-6 shadow-2xl overflow-hidden min-w-0">
          {/* Header toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 sm:px-3 py-2 border-b border-border/60 mb-4 sm:mb-5 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive shrink-0" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning shrink-0" />
              <span className="h-2.5 w-2.5 rounded-full bg-success shrink-0" />
              <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono text-muted-foreground truncate">
                infropay.ao/produtor
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              Atualização em tempo real
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-5 sm:mb-6 min-w-0">
            <div className="rounded-xl border border-border/70 bg-background/60 p-3 sm:p-4 min-w-0">
              <div className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase truncate">
                Faturamento
              </div>
              <div className="mt-1 text-base sm:text-2xl font-bold text-gold truncate">
                <CountUp to={1285000} prefix="" suffix=" Kz" />
              </div>
              <div className="mt-1 text-[9px] sm:text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <TrendingUp className="h-3 w-3 shrink-0" /> +24% este mês
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/60 p-3 sm:p-4 min-w-0">
              <div className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase truncate">
                Vendas
              </div>
              <div className="mt-1 text-base sm:text-2xl font-bold text-foreground truncate">
                <CountUp to={142} prefix="+" suffix=" pedidos" />
              </div>
              <div className="mt-1 text-[9px] sm:text-[10px] text-muted-foreground truncate">
                98.4% aprovação
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/60 p-3 sm:p-4 min-w-0">
              <div className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase truncate">
                Saldo Disponível
              </div>
              <div className="mt-1 text-base sm:text-2xl font-bold text-emerald-500 truncate">
                <CountUp to={960000} prefix="" suffix=" Kz" />
              </div>
              <div className="mt-1 text-[9px] sm:text-[10px] text-muted-foreground truncate">
                Pronto para saque
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/60 p-3 sm:p-4 min-w-0">
              <div className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase truncate">
                Produtos
              </div>
              <div className="mt-1 text-base sm:text-2xl font-bold text-primary-glow truncate">
                <CountUp to={6} suffix=" ativos" />
              </div>
              <div className="mt-1 text-[9px] sm:text-[10px] text-muted-foreground truncate">
                Checkouts ativos
              </div>
            </div>
          </div>

          {/* Graphic Banner / Preview */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-border">
            <img
              src={dashboardImg}
              alt="Prévia do painel do produtor InfroPay"
              width={1600}
              height={900}
              loading="lazy"
              className="w-full h-auto object-cover max-h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-4 sm:p-6">
              <Link to="/auth" search={{ mode: "signup" }} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto gradient-brand text-primary-foreground shadow-glow font-bold text-xs sm:text-sm">
                  Criar conta de produtor <ArrowRight className="h-4 w-4 ml-1.5 shrink-0" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECURSOS (Tudo que você precisa para vender) */}
      <section
        id="recursos"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 min-w-0"
      >
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 min-w-0">
          <div className="text-xs font-bold uppercase tracking-widest text-gold">Recursos</div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words">
            Tudo que você precisa para vender
          </h2>
          <p className="mt-3 text-xs sm:text-base text-muted-foreground break-words">
            Uma estrutura completa construída para potencializar as conversões dos seus produtos
            digitais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 min-w-0">
          {[
            {
              title: "Produtos",
              desc: "Cadastre e gerencie seus cursos, ebooks, mentorias e arquivos com facilidade.",
              icon: ShoppingBag,
            },
            {
              title: "Checkout",
              desc: "Tenha uma página de pagamento própria e ultra rápida para cada produto cadastrado.",
              icon: CreditCard,
            },
            {
              title: "Links de venda",
              desc: "Gere links exclusivos com rastreamento para compartilhar com seus clientes.",
              icon: LinkIcon,
            },
            {
              title: "Pedidos",
              desc: "Acompanhe todos os pedidos realizados, dados do cliente e entrega do conteúdo.",
              icon: Layers,
            },
            {
              title: "Pagamentos",
              desc: "Acompanhe o estado de aprovação de pagamentos por Multicaixa Express e Referência.",
              icon: ShieldCheck,
            },
            {
              title: "Analytics",
              desc: "Veja o desempenho das suas vendas, taxas de conversão e faturamento diário.",
              icon: BarChart3,
            },
            {
              title: "Order Bump",
              desc: "Ofereça produtos complementares no checkout e aumente o valor médio de cada venda.",
              icon: Zap,
            },
            {
              title: "Pixel",
              desc: "Configure eventos de conversão (Facebook, Google, TikTok) para acompanhar campanhas.",
              icon: Target,
            },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="rounded-2xl border border-border bg-card p-4 sm:p-5 hover:border-gold/40 hover:bg-card/90 transition flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-gold/10 text-gold grid place-items-center mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground break-words">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PARA QUEM É A INFROPAY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 min-w-0">
        <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card/60 p-5 sm:p-10 min-w-0">
          <div className="max-w-3xl mb-8 sm:mb-10 min-w-0">
            <div className="text-xs font-bold uppercase tracking-widest text-gold">
              Público-Alvo
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words">
              Feita para quem transforma conhecimento em produto
            </h2>
            <p className="mt-3 text-xs sm:text-base text-muted-foreground break-words">
              Não importa o formato do seu conhecimento. A InfroPay fornece a infraestrutura de
              checkout e entrega certa para você.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 min-w-0">
            {[
              {
                title: "Criadores de cursos",
                desc: "Hospede aulas em vídeo ou entregue acesso a plataformas externas com facilidade.",
                icon: GraduationCap,
              },
              {
                title: "Autores de ebooks",
                desc: "Venda PDFs, livros digitais e guias práticos com download imediato e protegido.",
                icon: BookOpen,
              },
              {
                title: "Criadores de templates",
                desc: "Comercialize planilhas, modelos Notion, designs Figma e materiais prontos.",
                icon: FileCode,
              },
              {
                title: "Mentores & Consultores",
                desc: "Venda sessões 1 a 1, consultorias em grupo e acompanhamentos personalizados.",
                icon: Briefcase,
              },
              {
                title: "Prestadores de serviços",
                desc: "Cobre por serviços pontuais ou pacotes de entrega com confirmação automática.",
                icon: Wrench,
              },
              {
                title: "Infoprodutores & Afiliados",
                desc: "Escale suas vendas com links diretos, pixels de conversão e saques rápidos.",
                icon: Flame,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/60 bg-background/60 p-4 sm:p-5 flex items-start gap-3.5 hover:border-gold/40 transition min-w-0"
                >
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gold/10 text-gold grid place-items-center shrink-0">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-foreground break-words">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed break-words">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SEGURANÇA E CONFIANÇA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 min-w-0">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 min-w-0">
          <div className="text-xs font-bold uppercase tracking-widest text-gold">
            Infraestrutura Segura
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words">
            Venda com confiança
          </h2>
          <p className="mt-3 text-xs sm:text-base text-muted-foreground break-words">
            Construímos uma plataforma estável, transparente e adaptada à realidade financeira de
            Angola.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
          {[
            {
              title: "Pagamentos protegidos",
              desc: "Integração segura com operadoras locais e protocolo de confirmação automatizado.",
              icon: Lock,
            },
            {
              title: "Gestão de pedidos",
              desc: "Histórico detalhado de cada transação, status de pagamento e dados do comprador.",
              icon: Layers,
            },
            {
              title: "Checkout seguro",
              desc: "Páginas com criptografia SSL 256-bit e alta taxa de disponibilidade para o comprador.",
              icon: ShieldCheck,
            },
            {
              title: "Controle das vendas",
              desc: "Notificações instantâneas a cada venda realizada para acompanhar em tempo real.",
              icon: Zap,
            },
            {
              title: "Dados organizados",
              desc: "Gestão simples da sua base de clientes, faturamento acumulado e produtos ativos.",
              icon: BarChart3,
            },
            {
              title: "Acompanhamento financeiro",
              desc: "Painel transparente de saques, saldos liberados e transferências diretas por IBAN.",
              icon: TrendingUp,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-border/80 transition min-w-0"
              >
                <div className="h-10 w-10 rounded-xl bg-gold/10 text-gold grid place-items-center mb-3 sm:mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground break-words">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <TrustMarquee />

      {/* 7. FAQ SECTION */}
      <section
        id="faq"
        className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 min-w-0"
      >
        <div className="text-center mb-8 sm:mb-10 min-w-0">
          <div className="text-xs font-bold uppercase tracking-widest text-gold">Dúvidas</div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight break-words">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground break-words">
            Respostas diretas sobre como vender com a InfroPay.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 min-w-0">
          {[
            {
              q: "Quanto custa para criar conta e cadastrar produtos?",
              a: "É 100% gratuito. Não há mensalidades nem taxas de adesão. A InfroPay cobra apenas uma taxa de 2% por venda realizada.",
            },
            {
              q: "Como o cliente paga pelo meu produto?",
              a: "O cliente acessa o seu link de checkout e pode pagar via Multicaixa Express, Referência Multicaixa ou Transferência Bancária.",
            },
            {
              q: "Como recebo o dinheiro das minhas vendas?",
              a: "Seu saldo fica disponível no painel do produtor e pode ser sacado diretamente para a sua conta bancária angolana via IBAN.",
            },
            {
              q: "Preciso ter uma loja completa para vender?",
              a: "Não! A InfroPay gera links de venda diretos. Você só precisa cadastrar o produto, copiar o link e enviar aos seus clientes.",
            },
            {
              q: "Que tipos de produtos posso vender?",
              a: "Você pode vender cursos online, ebooks, mentorias, planilhas, arquivos digitais, templates e serviços pontuais.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-4 sm:p-5 text-left transition hover:border-gold/40 min-w-0"
            >
              <h3 className="font-bold text-xs sm:text-base text-foreground flex items-center gap-2 break-words">
                <HelpCircle className="h-4 w-4 text-gold shrink-0" />
                <span>{item.q}</span>
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground pl-6 leading-relaxed break-words">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-24 min-w-0">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/30 min-h-[320px] sm:min-h-[380px] min-w-0">
          <img
            src={bannerProdutores}
            alt=""
            width={1600}
            height={900}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/85 to-primary/20" />
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full gradient-brand opacity-25 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full gradient-gold opacity-15 blur-3xl" />
          <div className="relative p-6 sm:p-12 md:p-14 max-w-2xl min-w-0">
            <div className="text-xs font-semibold uppercase tracking-widest text-gold">
              Comece agora
            </div>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight break-words">
              Seu próximo produto pode começar aqui.
            </h2>
            <p className="mt-3 text-xs sm:text-base text-muted-foreground leading-relaxed break-words">
              Crie sua conta, cadastre seu produto e comece a compartilhar seu link de venda hoje
              mesmo.
            </p>

            <ul className="mt-5 space-y-2 text-xs sm:text-sm text-foreground/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Sem mensalidade — apenas
                2% por venda aprovada
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Checkout Multicaixa com
                alta conversão
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Saques por transferência
                bancária (IBAN)
              </li>
            </ul>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to="/auth" search={{ mode: "signup" }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gradient-brand text-primary-foreground shadow-glow h-12 px-7 font-bold text-sm sm:text-base"
                >
                  Começar agora <ArrowRight className="ml-1.5 h-4 w-4 shrink-0" />
                </Button>
              </Link>
              <Link to="/auth" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-7 font-semibold border-border/80 text-sm sm:text-base"
                >
                  Já tenho uma conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
