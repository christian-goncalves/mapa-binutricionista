import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/mapa-binutricionista.lovable.app-a2f84283/root-8a5edab2/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade | Bianca Gonçalves",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>Ao utilizar o Mapa do Automático, você compartilha nome, e-mail, WhatsApp e a autorização para contato posterior sobre este resultado.</p>
      <p>As respostas às cinco perguntas e o resultado exibido não são armazenados.</p>
      <p>Os dados coletados são usados somente para registrar sua participação e permitir contato posterior da Bianca Gonçalves sobre este resultado. Não há disparo automático de e-mail, WhatsApp, campanhas ou marketing.</p>
      <p>Os dados são mantidos enquanto necessários para esse contato ou até que você solicite a exclusão.</p>
      <p>A planilha usada para registrar os dados está compartilhada publicamente para edição por decisão operacional. Isso significa que qualquer pessoa que obtenha o link pode visualizar, alterar ou excluir informações registradas. Não envie outros dados pessoais além dos campos solicitados nesta ferramenta.</p>
      <p>Não comercializamos seus dados pessoais.</p>
      <p>
        Para solicitar acesso, correção ou exclusão dos seus dados, entre em contato pelo Instagram{" "}
        <a href="https://instagram.com/binutricionista" target="_blank" rel="noreferrer">@binutricionista</a>.
      </p>
    </LegalPage>
  );
}
