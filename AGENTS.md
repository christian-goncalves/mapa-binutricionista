<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Instruções do repositório: Mapa do Automático

## Objetivo

Este repositório contém uma reprodução em Next.js do fluxo interativo “Mapa do Automático”, da Bianca Gonçalves. A página apresenta cinco perguntas sobre comportamento alimentar, coleta respostas no navegador e exibe uma devolutiva educativa com o padrão mais frequente.

## Estado atual e limites

- `/` contém o fluxo completo: abertura, cinco perguntas, captura local e resultado.
- `/privacidade` e `/termos` são páginas estáticas de apoio.
- As etapas do mapa são estados React; não devem ser convertidas em rotas sem uma necessidade funcional clara.
- `mapa-data.ts` é a fonte das perguntas, categorias, textos e regra local de desempate.
- Não existe, neste clone, persistência em Supabase, envio de e-mail, integração de marketing ou geração remota de conteúdo.
- Não tratar o resultado local como diagnóstico clínico nem afirmar que dados foram armazenados quando não houver uma integração implementada e validada.

## Stack e comandos

- Next.js 16.3, App Router, React 19 e TypeScript strict.
- Tailwind CSS v4 e componentes React nomeados.
- `npm run dev` inicia o desenvolvimento.
- `npm run lint` executa o ESLint.
- `npm run typecheck` executa o TypeScript sem emitir arquivos.
- `npm run build` valida e gera a saída de produção.
- `npm start` executa a saída construída.
- `docker compose up app --build` executa o container de produção.

## Organização do código

- `src/app/` contém as rotas públicas.
- `src/components/sites/mapa-binutricionista.lovable.app-a2f84283/root-8a5edab2/` contém os componentes específicos desta reprodução.
- `src/app/globals.css` concentra os estilos da aplicação.
- `next.config.ts` usa `output: "standalone"` e permite `127.0.0.1` somente para o desenvolvimento local.
- Preserve o namespace específico do site ao criar novos componentes ou assets do clone.

## Regras de alteração

- Antes de escrever código Next.js, leia o guia correspondente em `node_modules/next/dist/docs/`.
- Preserve o conteúdo observado da aplicação reproduzida; não invente integrações, promessas de armazenamento ou resultados clínicos.
- Não coloque segredos, arquivos `.env`, `node_modules`, `.next`, logs, capturas do Playwright ou caches no commit.
- Use TypeScript strict, evite `any`, mantenha componentes nomeados e prefira navegação interna com `next/link`.
- Faça alterações pequenas e valide o fluxo afetado no navegador quando houver interação.
- Após alterar código, rode pelo menos `npm run lint`, `npm run typecheck` e `npm run build`.

## Produção

O caminho suportado é construir com `npm ci && npm run build` e executar com `npm start`, ou usar o `Dockerfile` standalone. A persistência das respostas e o tratamento dos dados de nome/e-mail são pendências de produto e infraestrutura; qualquer implementação futura deve ser avaliada quanto a privacidade, consentimento, segurança e confirmação operacional.

## Escopo do histórico de produção

O histórico de publicação deve conter apenas o código, as dependências, as configurações de build/deploy e a documentação operacional do aplicativo. Configurações de agentes, capturas do navegador, pesquisa de clonagem, caches e arquivos específicos do template permanecem fora desse histórico.
