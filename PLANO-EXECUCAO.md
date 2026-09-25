# Plano executivo — Mapa do Automático

**Fonte de verdade:** `ESPECIFICACAO.md`
**Limite:** implementar e validar localmente a integração; não publicar o site nem ativar coleta pública.

## Prompt mestre

```text
Execute a implementação do Mapa do Automático usando ESPECIFICACAO.md como fonte única de verdade.

Trabalhe em etapas sequenciais. Antes de cada etapa, inspecione o estado real do repositório, do workflow n8n M6CSVtIxSonM5UmJ e da planilha aprovada. Preserve alterações não relacionadas. Não invente conteúdo, credenciais, URLs ou comportamento.

Implemente somente o escopo da especificação: hero, fluxo das cinco perguntas, progresso, transição, formulário obrigatório, resultado, rota segura Next.js, webhook n8n, gravação mínima no Google Sheets, privacidade e validação completa.

Não salve respostas, categoria ou resultado. Não envie e-mails, WhatsApp, campanhas ou marketing. Não altere os cards, as perguntas ou a lógica existente do resultado.

Após cada etapa, execute o checklist correspondente. Se todos os itens passarem, avance automaticamente para a próxima etapa. Se algum item falhar, corrija dentro do escopo, valide novamente e só então avance.

Use o workflow n8n M6CSVtIxSonM5UmJ, a credencial Google Sheets existente e a autenticação por cabeçalho existente. Mantenha segredos fora do código e do Git. Use apenas o histórico nativo do n8n para diagnóstico de falhas.

Faça um teste de persistência com dados sintéticos, confirme a linha criada nas cinco colunas e remova o registro de teste após a validação. Não use dados reais.

Execute lint, typecheck, build e validação do fluxo completo no navegador. Atualize README.md e AGENTS.md para refletirem o estado final. Faça commits somente das etapas concluídas e validadas, sem push.

Pare antes de publicar o site ou ativar a coleta pública. Ao final, informe os arquivos alterados, commits, testes aprovados e qualquer bloqueio remanescente.
```

## Etapas e checklists

### 1. Baseline e proteção

- Inspecionar `git status`, `AGENTS.md`, `README.md` e `ESPECIFICACAO.md`.
- Confirmar que não há alterações externas ao escopo.
- Confirmar workflow n8n acessível via MCP.

**Checkpoint:** estado inicial registrado e nenhuma alteração não autorizada será sobrescrita.

### 2. Google Sheets

- Manter compartilhamento `anyone: writer`, conforme decisão operacional posterior aprovada.
- Remover as colunas extras e manter somente `timestamp`, `nome`, `email`, `whatsapp`, `consentimento_contato`.
- Configurar `America/Sao_Paulo`.
- Verificar cabeçalhos e permissões.

**Checkpoint:** schema final confirmado, edição pública registrada como decisão assumida e sem dados de teste.

### 3. Workflow n8n

- Configurar o workflow oficial com webhook dedicado.
- Proteger o webhook com autenticação por cabeçalho.
- Validar payload e gravar somente as cinco colunas aprovadas.
- Usar a credencial Google Sheets existente.
- Manter o workflow em rascunho durante a validação.
- Confirmar que não há envio automático nem marketing.

**Checkpoint:** workflow validado, sem segredos expostos, pronto para receber teste controlado.

### 4. Aplicação Next.js

- Ajustar hero, CTA, progresso, transição, formulário e resultado conforme a especificação.
- Preservar perguntas, cards e lógica de resultado.
- Criar a rota segura de envio.
- Validar nome, e-mail, WhatsApp e consentimento.
- Normalizar WhatsApp e gerar timestamp brasileiro.
- Exibir o resultado mesmo quando a persistência falhar.
- Remover o selo Lovable em todas as páginas.

**Checkpoint:** aplicação compilando e fluxo local completo sem acesso direto do navegador à planilha.

### 5. Validação integrada

- Rodar `npm run lint`.
- Rodar `npm run typecheck`.
- Rodar `npm run build`.
- Executar o fluxo completo no navegador.
- Testar cinco perguntas, avanço automático, progresso e resultado.
- Testar campos inválidos e consentimento ausente.
- Executar uma submissão sintética controlada.
- Confirmar uma única nova linha com cinco campos.
- Remover o registro sintético.
- Testar falha de persistência sem esconder o resultado.

**Checkpoint:** todos os critérios de aceite da especificação aprovados.

### 6. Documentação e fechamento

- Atualizar `README.md` com o estado implementado.
- Atualizar `AGENTS.md` se houver mudança operacional necessária.
- Registrar limitações e o procedimento de deploy.
- Criar commits nomeados apenas para mudanças validadas.
- Confirmar que não há segredos, respostas ou resultados no Git.

**Checkpoint final:** projeto pronto para uma autorização futura de publicação, sem deploy ou ativação pública executados.
