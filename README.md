# Mapa do Automático

Aplicação Next.js da Bianca Gonçalves para uma autoavaliação educativa sobre comportamentos alimentares. O resultado é calculado localmente a partir de cinco respostas e não constitui diagnóstico.

## Status atual

Implementado e validado localmente em 25 de setembro de 2026:

- hero curta com CTA `Descobrir meu padrão`;
- cinco perguntas originais, cards preservados, progresso `1 de 5` a `5 de 5` e avanço automático;
- transição breve antes do formulário;
- captura obrigatória de nome, e-mail, WhatsApp e consentimento para contato posterior sobre o resultado;
- resultado educativo local, inclusive se o registro técnico falhar;
- rota protegida `POST /api/mapa/lead` para validar, normalizar e encaminhar somente os dados permitidos ao n8n;
- workflow n8n `M6CSVtIxSonM5UmJ` configurado, publicado e ativo por autorização explícita;
- registro mínimo em Google Sheets e páginas de privacidade e termos atualizadas;
- remoção integral do badge “Made with Lovable”.

Não houve deploy do site nem push remoto. O workflow n8n está ativo por ação explícita do responsável pelo projeto.

## Fluxo e dados

```text
Abertura
  -> 5 perguntas (estado React, sem mudança de URL)
  -> “Preparando seu resultado…”
  -> nome + e-mail + WhatsApp + consentimento
  -> POST /api/mapa/lead
  -> webhook n8n protegido por header
  -> Google Sheets
  -> resultado educativo no navegador
```

O navegador envia somente `nome`, `email`, `whatsapp` e `consentimento_contato: "sim"`. A rota gera o `timestamp` em `America/Sao_Paulo` e normaliza o telefone para `+55...`.

A planilha armazena exclusivamente:

| Coluna |
| --- |
| `timestamp` |
| `nome` |
| `email` |
| `whatsapp` |
| `consentimento_contato` |

Nunca são enviados ou registrados: respostas, categorias, padrão calculado ou texto do resultado. Não há envio automático de e-mail, WhatsApp, campanha ou marketing.

## Segurança e operação

`N8N_WEBHOOK_URL` e `N8N_WEBHOOK_SECRET` são variáveis apenas do servidor. Não usam o prefixo `NEXT_PUBLIC_`, não entram no Git e não são expostas ao navegador. Use `.env.example` apenas como modelo e configure os valores no ambiente local ou de deploy.

O workflow está publicado e ativo. Ele exige o header `key`, usa a credencial técnica existente do Google Sheets e devolve `201`, `400` ou `502`. Sem as variáveis de ambiente, a rota devolve falha controlada e o resultado permanece disponível na tela.

**Atenção:** a planilha foi mantida como `anyone: writer` por decisão explícita. Qualquer pessoa que obtenha o link pode visualizar, incluir, alterar ou excluir dados. O link não é enviado pelo navegador, mas essa permissão é um risco operacional assumido e deve ser reavaliada antes de qualquer coleta pública.

## Executar localmente

Requisitos: Node.js 24 ou superior e npm.

```bash
npm ci
npm run dev
```

Abra `http://127.0.0.1:3000`.

Para testar o caminho real de persistência, crie `.env.local` a partir de `.env.example` e preencha as duas variáveis com valores seguros. Nunca publique o segredo em chat, código ou commit.

## Validação

```bash
npm run lint
npm run typecheck
npm run build
```

Validações realizadas nesta implementação:

- lint, TypeScript e build aprovados;
- fluxo completo validado no navegador local;
- validações de consentimento e e-mail verificadas;
- cenário de falha de persistência confirmou que o resultado continua visível;
- execução sintética do n8n `7916` criou uma linha com cinco colunas e foi removida em seguida;
- execução real pelo formulário `7920` foi registrada como `webhook` com sucesso e permaneceu na planilha para conferência visual.

## Rotas e estrutura

| Rota | Conteúdo |
| --- | --- |
| `/` | Mapa completo |
| `/api/mapa/lead` | Validação server-side e encaminhamento ao n8n |
| `/privacidade` | Política de privacidade |
| `/termos` | Termos de uso |

```text
src/app/api/mapa/lead/route.ts     # integração segura Next.js -> n8n
src/components/sites/mapa-binutricionista.lovable.app-a2f84283/
  root-8a5edab2/                   # fluxo, perguntas e resultados
ESPECIFICACAO.md                   # contrato aprovado
PLANO-EXECUCAO.md                  # plano executado
```

## Publicação futura

O workflow n8n está ativo, mas uma nova autorização continua necessária antes de publicar o site, fazer push ou ampliar a coleta real. O conteúdo da devolutiva é educativo e não substitui avaliação nutricional individualizada ou atendimento profissional de saúde.
