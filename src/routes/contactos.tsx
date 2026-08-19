import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Send,
  Clock,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos & Suporte — InfroPay" },
      {
        name: "description",
        content:
          "Entre em contacto com a equipa da InfroPay. Suporte técnico, atendimento a produtores e parcerias em Luanda, Angola.",
      },
    ],
    links: [{ rel: "canonical", href: "/contactos" }],
  }),
  component: Contactos,
});

function Contactos() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState("suporte");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Simulate sending inquiry to support
    await new Promise((r) => setTimeout(r, 700));

    toast.success("Mensagem enviada com sucesso! Responderemos em menos de 24h.");
    setSent(true);
    setLoading(false);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Voltar à página inicial
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-gold border border-gold/30 mb-3">
            <MessageCircle className="h-3.5 w-3.5" /> Atendimento Dedicado
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Fale com a <span className="text-gradient-gold">InfroPay</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Dúvidas sobre pagamentos, integração de produtos ou saques? A nossa equipa em Luanda
            está pronta para ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Mail className="h-5 w-5 text-gold" /> Canais Oficiais
              </h2>

              <div className="space-y-3">
                <a
                  href="mailto:suporte@infropay.ao"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-background/60 border border-border/60 hover:border-gold/50 transition group"
                >
                  <div className="h-10 w-10 rounded-lg gradient-brand grid place-items-center shrink-0 text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase font-semibold text-muted-foreground">
                      Email de Suporte
                    </div>
                    <div className="font-bold text-sm text-foreground group-hover:text-gold transition truncate">
                      suporte@infropay.ao
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      infropayao@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/244900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-background/60 border border-border/60 hover:border-success/50 transition group"
                >
                  <div className="h-10 w-10 rounded-lg bg-success text-white grid place-items-center shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase font-semibold text-muted-foreground">
                      WhatsApp Produtores
                    </div>
                    <div className="font-bold text-sm text-foreground group-hover:text-success transition truncate">
                      +244 900 000 000
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Atendimento rápido para criadores
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-background/60 border border-border/60">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 text-primary grid place-items-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase font-semibold text-muted-foreground">
                      Sede
                    </div>
                    <div className="font-bold text-sm text-foreground">Luanda, Angola</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Operação e infraestrutura local
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Clock className="h-4 w-4 text-gold" /> Horário de Atendimento
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Segunda a Sexta-feira: <strong>08:00 – 18:00 (WAT)</strong>
                <br />
                Sábados: <strong>09:00 – 13:00</strong>
                <br />
                Monitorização de pagamentos Multicaixa: <strong>24/7 ininterrupto</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
            {sent ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="h-14 w-14 rounded-full bg-success/10 text-success grid place-items-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Mensagem Recebida!</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                  O seu pedido foi encaminhado com sucesso para a nossa equipa de apoio. Entraremos
                  em contacto em menos de 24 horas.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSent(false)} className="mt-2">
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4 sm:space-y-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    Envie uma Mensagem
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Preencha os campos abaixo com as informações do seu pedido.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="nome" className="text-xs font-semibold">
                      Seu Nome *
                    </Label>
                    <Input id="nome" required placeholder="Ex: Manuel António" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold">
                      Seu Email *
                    </Label>
                    <Input id="email" required type="email" placeholder="manuel@exemplo.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="telefone" className="text-xs font-semibold">
                      Telefone / WhatsApp
                    </Label>
                    <Input id="telefone" placeholder="+244 9XX XXX XXX" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Assunto / Categoria *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="suporte">Suporte ao Produtor</SelectItem>
                        <SelectItem value="financeiro">Dúvida Financeira / Saques</SelectItem>
                        <SelectItem value="comprador">Ajuda com Compra / Acesso</SelectItem>
                        <SelectItem value="parcerias">Parcerias e Integrações</SelectItem>
                        <SelectItem value="outro">Outro Assunto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="mensagem" className="text-xs font-semibold">
                    Mensagem Detalhada *
                  </Label>
                  <Textarea
                    id="mensagem"
                    required
                    rows={5}
                    placeholder="Descreva a sua questão com detalhes..."
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-brand text-primary-foreground font-bold shadow-glow h-11"
                >
                  {loading ? (
                    "A enviar mensagem..."
                  ) : (
                    <>
                      Enviar Mensagem <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-muted-foreground text-center">
                  Ao enviar, você concorda com a nossa{" "}
                  <Link to="/privacidade" className="text-gold underline">
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
