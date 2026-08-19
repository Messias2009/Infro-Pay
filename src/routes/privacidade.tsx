import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Lock, Eye, Database, UserCheck, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — InfroPay" },
      {
        name: "description",
        content:
          "Saiba como a InfroPay recolhe, utiliza e protege os seus dados pessoais em conformidade com a legislação de Angola.",
      },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Voltar à página inicial
          </Link>
        </div>

        {/* Header Hero */}
        <div className="border-b border-border/70 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-gold border border-gold/30 mb-4">
            <Lock className="h-3.5 w-3.5" /> Protecção de Dados Pessoais
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            A sua privacidade e a segurança dos seus dados são prioridades fundamentais na InfroPay.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>Última actualização: 19 de Agosto de 2026</span>
            <span>•</span>
            <span>Conformidade com a Lei n.º 22/11 de Protecção de Dados Pessoais</span>
          </div>
        </div>

        {/* Highlight Summary Card */}
        <div className="rounded-2xl border border-border bg-card/80 p-5 sm:p-6 mb-10 shadow-sm">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-success shrink-0" />
            Nossos Compromissos de Privacidade
          </h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-muted-foreground">
            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <strong className="text-foreground block mb-1">Nunca Vendemos Dados:</strong>
              Suas informações pessoais nunca são comercializadas ou compartilhadas com terceiros
              para fins publicitários.
            </div>
            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <strong className="text-foreground block mb-1">Criptografia SSL 256-bit:</strong>
              Todas as comunicações e transações financeiras são transmitidas sob canais
              encriptados.
            </div>
            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <strong className="text-foreground block mb-1">Direito ao Esquecimento:</strong>
              Você pode solicitar a qualquer momento a exclusão ou cópia dos seus dados cadastrais.
            </div>
            <div className="p-3 rounded-xl bg-background/60 border border-border/60">
              <strong className="text-foreground block mb-1">Transparência Financeira:</strong>
              Dados de pagamento são tokenizados diretamente com as operadoras bancárias
              autorizadas.
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-gold" /> 1. Informações que Recolhemos
            </h2>
            <p>A InfroPay recolhe apenas as informações necessárias para prestar o serviço:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Dados Cadastrais de Produtor:</strong> Nome completo, endereço de email,
                número de telefone, número de identificação fiscal (NIF / BI) e IBAN bancário para
                recebimento de saques.
              </li>
              <li>
                <strong>Dados de Comprador no Checkout:</strong> Nome, endereço de email (para envio
                imediato do infoproduto) e telefone (para validação do Multicaixa Express).
              </li>
              <li>
                <strong>Dados Técnicos de Navegação:</strong> Endereço IP, tipo de navegador, logs
                de acesso e identificadores de sessão essenciais.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Eye className="h-5 w-5 text-gold" /> 2. Finalidade do Tratamento
            </h2>
            <p>Utilizamos os dados pessoais recolhidos para as seguintes finalidades:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Processar compras e autorizar transações bancárias em tempo real;</li>
              <li>Entregar o acesso aos infoprodutos aos respectivos compradores;</li>
              <li>Prevenir fraudes financeiras e garantir a segurança das contas;</li>
              <li>Cumprir obrigações fiscais e regulatórias da República de Angola;</li>
              <li>
                Prestar assistência e suporte técnico através dos nossos canais de atendimento.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-gold" /> 3. Segurança e Armazenamento
            </h2>
            <p>
              Empregamos protocolos de segurança modernos, incluindo encriptação em trânsito
              (TLS/HTTPS) e em repouso nos nossos servidores. O acesso aos dados é restrito a
              pessoal estritamente autorizado mediante autenticação de dois fatores e auditoria de
              logs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-gold" /> 4. Seus Direitos
            </h2>
            <p>Em conformidade com a legislação de protecção de dados, você tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Confirmar a existência do tratamento dos seus dados;</li>
              <li>Aceder aos dados pessoais arquivados;</li>
              <li>Solicitar a correção de dados incompletos ou inexatos;</li>
              <li>Solicitar a eliminação dos seus dados após o encerramento da conta.</li>
            </ul>
            <p>
              Para exercer qualquer destes direitos, envie uma mensagem para{" "}
              <a
                href="mailto:privacidade@infropay.ao"
                className="text-gold underline underline-offset-4"
              >
                privacidade@infropay.ao
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              5. Utilização de Cookies
            </h2>
            <p>
              Utilizamos cookies estritamente necessários para manter a sua sessão activa e cookies
              analíticos anónimos para aferir a usabilidade das nossas páginas de checkout.
            </p>
          </section>
        </div>

        {/* Contact box */}
        <div className="mt-14 rounded-2xl border border-border/80 bg-card p-6 text-center space-y-3">
          <h3 className="font-bold text-foreground text-lg">Encarregado de Protecção de Dados</h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Dúvidas sobre o tratamento dos seus dados pessoais podem ser encaminhadas diretamente à
            nossa equipa de privacidade.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/contactos">
              <Button variant="outline" className="text-xs sm:text-sm font-medium">
                Página de Contactos
              </Button>
            </Link>
            <a href="mailto:privacidade@infropay.ao">
              <Button className="gradient-brand text-primary-foreground text-xs sm:text-sm font-medium">
                privacidade@infropay.ao
              </Button>
            </a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
