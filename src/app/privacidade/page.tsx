import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/mapa-binutricionista.lovable.app-a2f84283/root-8a5edab2/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade | Bianca Gonçalves",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>Ao utilizar o Mapa do Automático, você compartilha seu primeiro nome, seu e-mail e as respostas dadas às cinco perguntas.</p>
      <p>Essas informações são utilizadas para gerar e exibir sua devolutiva.</p>
      <p>Caso você marque a opção de autorização, seu e-mail também poderá ser utilizado para o envio de conteúdos e novos materiais da Bianca Gonçalves.</p>
      <p>Não comercializamos seus dados pessoais.</p>
      <p>Algumas informações podem ser processadas por serviços tecnológicos utilizados para hospedar, armazenar e operar esta ferramenta, sempre de acordo com as políticas e medidas de segurança desses serviços.</p>
      <p>Você poderá solicitar acesso, correção ou exclusão dos seus dados.</p>
      <p>
        Para solicitações relacionadas aos seus dados, entre em contato pelo Instagram{" "}
        <a href="https://instagram.com/binutricionista" target="_blank" rel="noreferrer">@binutricionista</a>.
      </p>
    </LegalPage>
  );
}
