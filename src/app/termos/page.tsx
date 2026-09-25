import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/mapa-binutricionista.lovable.app-a2f84283/root-8a5edab2/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso | Bianca Gonçalves",
};

export default function TermsPage() {
  return (
    <LegalPage title="Termos de Uso">
      <p>O Mapa do Automático é um material educativo e de autopercepção sobre comportamento alimentar.</p>
      <p>O resultado apresentado indica uma influência possível a observar. Não é diagnóstico, avaliação clínica, prescrição dietética ou tratamento, e não substitui atendimento individual com profissional de saúde.</p>
      <p>Para concluir o fluxo, é necessário informar nome, e-mail e WhatsApp e autorizar contato posterior da Bianca Gonçalves exclusivamente sobre este resultado.</p>
      <p>O conteúdo é de autoria de Bianca Gonçalves e não deve ser reproduzido sem autorização.</p>
      <p>Ao utilizar a ferramenta, você concorda com estas condições e com a Política de Privacidade.</p>
    </LegalPage>
  );
}
