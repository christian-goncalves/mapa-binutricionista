# Especificação — Mapa do Automático

**Status:** implementada e validada localmente; workflow n8n ativo por autorização explícita
**Versão:** 1.0
**Data:** 25 de setembro de 2026
**Produto:** experiência interativa da Bianca Gonçalves

## 1. Objetivo

Transformar a abertura atual do “Mapa do Automático” em uma entrada curta, clara e orientada à ação, preservando as cinco perguntas, os cards de resposta e a devolutiva educativa já reproduzida.

Ao final do fluxo, a pessoa deverá fornecer nome, e-mail, WhatsApp e consentimento para contato posterior. O resultado continuará sendo exibido na tela, mas nenhuma resposta do questionário nem o resultado serão armazenados.

## 2. Escopo aprovado

### Incluído

- revisão da hero e da copy de abertura;
- remoção do selo “Made with Lovable” em todas as páginas;
- preservação das cinco perguntas e dos cards existentes;
- indicação de progresso de `1 de 5` a `5 de 5`;
- avanço automático após a seleção de uma alternativa;
- tela breve de transição antes da devolutiva;
- formulário obrigatório de identificação e consentimento;
- rota segura no Next.js para validar e encaminhar os dados;
- webhook dedicado do n8n;
- gravação mínima no Google Sheets;
- revisão das páginas de privacidade e termos;
- validação do fluxo completo no navegador.

### Fora do escopo desta versão

- salvar as respostas das cinco perguntas;
- salvar a categoria ou o texto do resultado;
- envio automático por e-mail ou WhatsApp;
- campanhas, newsletters ou marketing posterior;
- geração de texto por IA;
- criação de novas perguntas ou novos cards;
- mudança da lógica de cálculo do resultado;
- criação de novas rotas para cada pergunta.

## 3. Experiência do usuário

### 3.1 Abertura

A primeira tela deve conter somente a identificação da profissional, a promessa, a indicação de esforço e o CTA principal.

Texto aprovado:

> **Mapa do Automático**
> Entenda o que está por trás das suas escolhas alimentares.
> São só 5 perguntas rápidas.

CTA:

> **Descobrir meu padrão**

Diretrizes:

- manter “Bianca Gonçalves” e “Nutricionista comportamental” no topo;
- usar hero centralizada e espaçada;
- não adicionar imagem nesta etapa;
- não exibir explicações longas antes do CTA;
- remover “Leva cerca de 2 minutos”;
- não exibir “Não existem respostas certas ou erradas” na hero;
- remover o selo “Made with Lovable”.

### 3.2 Questionário

- preservar os textos atuais das cinco perguntas;
- preservar a aparência e a interação dos cards atuais;
- aceitar uma única alternativa por pergunta;
- avançar automaticamente após a seleção;
- manter a barra de progresso existente;
- exibir a etapa em formato textual, por exemplo `1 de 5`;
- exibir a orientação “Responda pensando no que acontece com você.” na área do questionário, não na hero.

### 3.3 Transição

Após a quinta resposta, exibir brevemente:

> Preparando seu resultado…

Essa tela não deve simular processamento de IA nem impor uma espera longa.

### 3.4 Formulário

O formulário aparece depois das cinco perguntas e antes da conclusão do fluxo.

Ordem dos campos:

1. nome;
2. e-mail;
3. WhatsApp;
4. consentimento.

Texto introdutório:

> Para ver seu resultado, preencha seus dados abaixo.

Texto de finalidade:

> Seus dados serão usados para registrar sua participação e permitir um contato posterior sobre este resultado.

Campos obrigatórios:

- `nome`;
- `email`;
- `whatsapp`;
- consentimento.

Consentimento, inicialmente desmarcado:

> Aceito receber contato posterior da Bianca Gonçalves por e-mail e WhatsApp sobre este resultado.

Botão:

> **Ver meu resultado**

Se o consentimento não for marcado, o fluxo não deve ser concluído. Mensagem esperada:

> Para ver seu resultado, confirme que aceita o contato posterior.

### 3.5 Resultado

- exibir o resultado normalmente após o envio válido do formulário;
- manter os cinco padrões e o conteúdo educativo existente;
- apresentar o resultado como influência possível, não como diagnóstico;
- não persistir o padrão, a categoria ou o texto da devolutiva;
- manter a ressalva de que o conteúdo é educativo e não substitui avaliação profissional.

Se houver falha técnica no registro, o resultado ainda deve ser exibido. A mensagem discreta pode ser:

> Seu resultado está pronto. Tivemos um problema ao registrar seus dados. Tente novamente mais tarde.

## 4. Dados e Google Sheets

### 4.1 Schema final

A planilha deve conter somente as colunas abaixo, nesta ordem:

| Coluna | Tipo | Obrigatória | Regra |
| --- | --- | --- | --- |
| `timestamp` | data/hora | sim | gravado em `America/Sao_Paulo` |
| `nome` | texto | sim | nome informado no formulário |
| `email` | texto | sim | formato básico de e-mail válido |
| `whatsapp` | texto | sim | número brasileiro normalizado |
| `consentimento_contato` | texto | sim | `sim` ou `nao`; nesta versão, deve ser `sim` para concluir |

Não devem ser gravados:

- respostas individuais;
- categorias das respostas;
- resultado ou padrão identificado;
- textos da devolutiva;
- dados de campanha ou marketing.

Cada envio válido cria uma nova linha, mesmo que o mesmo e-mail já exista.

### 4.2 Estado de acesso

- a planilha permanecerá compartilhada como `anyone: writer`, por decisão explícita do responsável pelo projeto;
- o acesso público de edição é uma decisão operacional assumida e permite que qualquer pessoa com o link visualize, inclua, altere ou remova linhas;
- a conta técnica usada pelo n8n continuará sendo a credencial de gravação da integração;
- o navegador não terá acesso direto à planilha;
- o link da planilha não será usado como credencial.

## 5. Arquitetura de integração

Fluxo aprovado:

```text
Navegador
  -> rota segura do Next.js
  -> webhook dedicado e protegido do n8n
  -> Google Sheets
```

### 5.1 Rota Next.js

A rota deve:

1. receber somente os campos aprovados;
2. validar nome, e-mail, WhatsApp e consentimento;
3. normalizar o WhatsApp;
4. gerar o timestamp em `America/Sao_Paulo`;
5. encaminhar os dados ao webhook do n8n;
6. não expor a URL da planilha;
7. não conter credenciais no código ou no commit;
8. retornar um status que permita ao cliente exibir o resultado mesmo em falha de persistência.

### 5.2 Webhook n8n

O n8n deverá ter um workflow dedicado para este mapa. O webhook deve:

- exigir um header secreto enviado pela rota Next.js;
- rejeitar payloads incompletos ou inválidos;
- gravar somente as cinco colunas aprovadas;
- usar uma credencial técnica do Google Sheets;
- registrar falhas para diagnóstico;
- não enviar mensagens automáticas;
- não iniciar campanhas ou marketing.

O segredo não pode ser escrito no repositório. O mecanismo de armazenamento protegido será definido no ambiente de execução da rota e do n8n.

## 6. Privacidade e consentimento

- o consentimento deve ser explícito e começar desmarcado;
- a finalidade deve ser apresentada junto ao formulário;
- o contato autorizado limita-se ao resultado e ao contato posterior da Bianca;
- não haverá autorização automática para marketing;
- a política de privacidade deve explicar os campos coletados, a finalidade, os responsáveis pelo acesso e o procedimento de solicitação de exclusão;
- não foi definido prazo fixo de retenção; a política deve dizer que os dados serão mantidos enquanto forem necessários para o contato relacionado ao resultado ou até solicitação de exclusão.

## 7. Mensagens e validações

### E-mail

Usar validação básica de formato. Não tentar confirmar a existência da caixa postal.

### WhatsApp

Aceitar número com ou sem `+55`, com formatação comum ou somente números. Normalizar antes do envio e rejeitar números claramente incompletos.

### Erros

- erros de campo devem aparecer próximos ao campo correspondente;
- o botão não deve concluir o fluxo com dados inválidos;
- falha de persistência não deve esconder o resultado;
- detalhes técnicos não devem ser exibidos para a pessoa usuária.

## 8. Critérios de aceite

### Abertura

- [ ] hero exibe o título e a chamada aprovados;
- [ ] CTA exibe “Descobrir meu padrão”;
- [ ] texto de duração antiga foi removido;
- [ ] selo da Lovable não aparece em nenhuma página;
- [ ] abertura não contém explicação longa antes do CTA.

### Questionário

- [ ] cinco perguntas continuam disponíveis;
- [ ] cards atuais foram preservados;
- [ ] seleção avança automaticamente;
- [ ] barra e indicador `n de 5` evoluem corretamente;
- [ ] recarregar ou reiniciar não reutiliza respostas antigas.

### Formulário

- [ ] nome, e-mail e WhatsApp são obrigatórios;
- [ ] consentimento inicia desmarcado;
- [ ] sem consentimento, o fluxo não conclui;
- [ ] e-mail inválido é rejeitado;
- [ ] WhatsApp é normalizado;
- [ ] botão usa “Ver meu resultado”.

### Persistência

- [ ] a planilha permanece pública para edição por decisão registrada, sem ser exposta ao navegador nem usada como credencial;
- [ ] schema contém somente as cinco colunas aprovadas;
- [ ] cada envio cria uma nova linha;
- [ ] timestamp usa o fuso brasileiro;
- [ ] nenhuma resposta ou resultado é gravado;
- [ ] navegador não acessa a planilha diretamente;
- [ ] rota e webhook rejeitam payload inválido;
- [ ] falha de gravação não impede a exibição do resultado.

### Validação técnica

- [ ] `npm run lint` passa;
- [ ] `npm run typecheck` passa;
- [ ] `npm run build` passa;
- [ ] fluxo completo validado no navegador;
- [ ] teste real de persistência realizado somente após confirmar o destino e os efeitos do teste.

## 9. Estado de implementação

Implementação concluída em 25 de setembro de 2026:

- a rota segura do Next.js, o formulário obrigatório e a lógica de fallback foram implementados;
- o workflow n8n `M6CSVtIxSonM5UmJ` foi validado e está ativo por autorização explícita;
- a planilha contém somente as cinco colunas aprovadas, no fuso `America/Sao_Paulo`;
- a execução sintética `7916` foi removida após a validação e a execução real via formulário `7920` confirmou a integração ponta a ponta;
- a planilha permanece pública para edição por decisão posterior registrada. Essa escolha precisa ser considerada antes de ampliar a coleta;
- o site ainda não recebeu deploy nem push remoto.
