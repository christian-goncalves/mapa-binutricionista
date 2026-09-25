<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Instruções do repositório: Mapa do Automático

## Produto e contrato

O Mapa do Automático é uma experiência educativa da Bianca Gonçalves. Preserve `ESPECIFICACAO.md` como contrato e `PLANO-EXECUCAO.md` como histórico executivo.

- O fluxo em `/` tem hero, cinco perguntas, transição, formulário e resultado na mesma rota React. Não criar URLs por pergunta.
- Preservar as perguntas, os cards e `deriveCategory` em `mapa-data.ts`; respostas e resultado existem somente em memória no navegador.
- O resultado descreve uma influência possível, nunca diagnóstico, prescrição ou avaliação clínica.
- Os campos obrigatórios são `nome`, `email`, `whatsapp` e consentimento explícito para contato posterior sobre o resultado. Não há autorização para marketing.
- Não criar envio automático de e-mail, WhatsApp, campanhas, IA ou persistência de respostas, categorias ou resultado.

## Integração aprovada

O único caminho de persistência é `Navegador -> POST /api/mapa/lead -> n8n -> Google Sheets`.

- A rota aceita e encaminha somente `timestamp`, `nome`, `email`, `whatsapp` e `consentimento_contato`.
- O timestamp é gerado em `America/Sao_Paulo`; o WhatsApp é normalizado para o formato brasileiro com `+55`.
- O workflow é `M6CSVtIxSonM5UmJ`, está publicado e ativo por autorização explícita e usa header secreto `key`. Não o desative, publique nova versão ou altere sua credencial sem nova autorização.
- `N8N_WEBHOOK_URL` e `N8N_WEBHOOK_SECRET` são exclusivamente server-side. Nunca usar `NEXT_PUBLIC_`, registrar valores no Git, expor em logs ou pedir o segredo em chat.
- Se a persistência falhar, o resultado deve continuar visível sem detalhes técnicos.
- A planilha está publicamente editável (`anyone: writer`) por decisão explícita. Não exponha seu link no navegador e trate essa permissão como risco operacional que exige revisão antes de coleta pública.

## Stack e organização

- Next.js 16.3, App Router, React 19, TypeScript strict e Tailwind CSS v4.
- `src/app/api/mapa/lead/route.ts` contém a validação server-side.
- `src/components/sites/mapa-binutricionista.lovable.app-a2f84283/root-8a5edab2/` contém os componentes específicos desta reprodução.
- `src/app/globals.css` concentra os estilos. O badge Lovable foi removido e não deve ser recriado.
- Preserve o namespace específico do site ao criar componentes ou assets.

## Desenvolvimento e validação

- Antes de escrever código Next.js, leia o guia aplicável em `node_modules/next/dist/docs/`.
- Use TypeScript strict, evite `any`, mantenha componentes nomeados e prefira `next/link` para navegação interna.
- Após qualquer alteração funcional, execute `npm run lint`, `npm run typecheck` e `npm run build`.
- Quando houver interface interativa, valide no navegador: abertura, cinco etapas, formulário, resultado e cenário de falha de persistência.
- Não interrompa um servidor de desenvolvimento já existente sem autorização; use-o ou escolha outra porta.

## Produção e Git

- Não fazer push, deploy, desativar ou alterar o workflow n8n ativo, nem ampliar a coleta real sem autorização explícita.
- Configurar segredos somente no ambiente de execução, usando `.env.example` apenas como modelo.
- Não colocar `.env*`, segredos, `node_modules`, `.next`, logs, capturas de navegador ou caches em commits.
- O histórico de produção deve conter somente código, configuração de build/deploy e documentação operacional relevante.
- Após editar este arquivo, execute `bash scripts/sync-agent-rules.sh` e revise as alterações geradas antes de incluí-las em um commit.
