import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, FileText, CheckCircle, Scale, Clock, Lock, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — InfroPay" },
      {
        name: "description",
        content:
          "Termos e condições gerais de utilização da plataforma InfroPay para produtores e compradores em Angola.",
      },
    ],
    links: [{ rel: "canonical", href: "/termos" }],
  }),
  component: Termos,
});

function Termos() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Navigation / Breadcrumb */}
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
            <Scale className="h-3.5 w-3.5" /> Legislação & Conformidade
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Termos de Uso da InfroPay
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Condições aplicáveis a todos os utilizadores, produtores, afiliados e compradores da
            plataforma.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>Última actualização: 19 de Agosto de 2026</span>
            <span>•</span>
            <span>República de Angola</span>
          </div>
        </div>

        {/* Highlight Summary Card */}
        <div className="rounded-2xl border border-gold/40 bg-card/80 p-5 sm:p-6 mb-10 shadow-sm">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-gold shrink-0" />
            Resumo dos Pontos Principais
          </h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>
                <strong>Taxa por venda:</strong> 2% retido no momento da confirmação do pagamento.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>
                <strong>Taxa por saque:</strong> 8% para processamento de transferência bancária.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>
                <strong>Saque mínimo:</strong> 5.000 Kz disponibilizados a partir de 1 hora.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>
                <strong>Responsabilidade:</strong> O produtor responde integralmente pela autoria do
                conteúdo.
              </span>
            </div>
          </div>
        </div>

        {/* Full Terms Content */}
        <div className="space-y-10 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-gold" /> 1. Aceitação e Definições
            </h2>
            <p>
              Ao aceder, criar conta, adquirir produtos ou cadastrar infoprodutos na plataforma{" "}
              <strong>InfroPay</strong>, você concorda expressamente com os presentes Termos de Uso
              e com a nossa{" "}
              <Link to="/privacidade" className="text-gold underline underline-offset-4">
                Política de Privacidade
              </Link>
              .
            </p>
            <p>Para efeitos deste documento, entende-se por:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Plataforma / InfroPay:</strong> O serviço tecnológico de intermediação de
                vendas, checkout e pagamentos de produtos digitais.
              </li>
              <li>
                <strong>Produtor:</strong> O criador ou detentor dos direitos que disponibiliza
                cursos, ebooks, templates ou mentorias para comercialização.
              </li>
              <li>
                <strong>Comprador:</strong> A pessoa singular ou colectiva que adquire o acesso ao
                produto digital através dos canais de checkout da InfroPay.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              2. Cadastro e Segurança da Conta
            </h2>
            <p>
              Para operar como produtor, é obrigatório fornecer informações verídicas, incluindo
              nome completo, endereço de correio eletrónico válido, número de telefone e dados de
              conta bancária (IBAN) angolana emitida em seu nome.
            </p>
            <p>
              O utilizador é o único responsável pela guarda e confidencialidade das suas
              credenciais de acesso, devendo notificar imediatamente a InfroPay em caso de suspeita
              de utilização não autorizada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-gold" /> 3. Tarifas, Comissões e Saques
            </h2>
            <p>A estrutura de remuneração e taxas da InfroPay é transparente e sem mensalidade:</p>
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              <div className="flex justify-between py-1.5 border-b border-border/60 text-xs sm:text-sm">
                <span className="font-medium text-foreground">Criação de conta e produtos</span>
                <span className="font-bold text-success">Gratuito</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/60 text-xs sm:text-sm">
                <span className="font-medium text-foreground">Taxa por venda aprovada</span>
                <span className="font-bold text-foreground">2%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/60 text-xs sm:text-sm">
                <span className="font-medium text-foreground">Taxa de saque bancário</span>
                <span className="font-bold text-foreground">8%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/60 text-xs sm:text-sm">
                <span className="font-medium text-foreground">Valor mínimo para saque</span>
                <span className="font-bold text-foreground">5.000 Kz</span>
              </div>
              <div className="flex justify-between py-1.5 text-xs sm:text-sm">
                <span className="font-medium text-foreground">Prazo de libertação do saldo</span>
                <span className="font-bold text-gold">A partir de 1 hora pós-aprovação</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              4. Conteúdo Permitido e Responsabilidade do Produtor
            </h2>
            <p>
              O Produtor garante que detém todos os direitos autorais, marcas e autorizações legais
              necessárias para a comercialização do material disponibilizado.
            </p>
            <p>É terminantemente proibida a comercialização de produtos que:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Violem a legislação vigente na República de Angola;</li>
              <li>Promovam esquemas de enriquecimento ilícito ou pirâmides financeiras;</li>
              <li>Contenham material pornográfico, violento, discriminatório ou difamatório;</li>
              <li>Infrinjam direitos de propriedade intelectual de terceiros.</li>
            </ul>
            <p>
              A InfroPay reserva-se o direito de suspender imediatamente produtos ou contas que
              infrinjam estas directrizes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-gold" /> 5. Pagamentos e Entrega
            </h2>
            <p>
              Os pagamentos são processados em moeda nacional (Kwanza — AOA) através de Multicaixa
              Express, Referência Multicaixa e Transferência Bancária.
            </p>
            <p>
              Após a confirmação da transação pelo sistema bancário, o comprador recebe acesso
              imediato ao conteúdo digital na página de confirmação e por correio eletrónico.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              6. Garantia e Política de Reembolso
            </h2>
            <p>
              Cada infoproduto possui um período de garantia definido pelo produtor (geralmente
              entre 7 e 30 dias corridos). Dentro desse prazo legal de reflexão, o comprador pode
              solicitar reembolso caso o produto não corresponda à descrição anunciada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              7. Legislação Aplicável e Resolução de Conflitos
            </h2>
            <p>
              Os presentes Termos de Uso são regidos pelas leis da República de Angola. Para a
              resolução de quaisquer litígios decorrentes deste contrato, fica eleito o Foro da
              Comarca de Luanda, com renúncia expressa a qualquer outro.
            </p>
          </section>
        </div>

        {/* Bottom CTA to Contact */}
        <div className="mt-14 rounded-2xl border border-border/80 bg-card p-6 text-center space-y-3">
          <h3 className="font-bold text-foreground text-lg">Tem dúvidas sobre os nossos termos?</h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            A nossa equipa jurídica e de suporte está à disposição para esclarecer qualquer questão.
          </p>
          <div className="pt-2">
            <Link to="/contactos">
              <Button variant="outline" className="font-semibold text-xs sm:text-sm">
                Falar com o Suporte
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
