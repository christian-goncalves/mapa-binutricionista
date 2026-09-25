# Mapa do Automático

Aplicação Next.js que reproduz o fluxo interativo do **Mapa do Automático**, uma ferramenta educativa de autopercepção sobre comportamento alimentar da Bianca Gonçalves.

## Status atual

O clone está funcional no navegador e contém:

- tela inicial com o CTA “Começar meu mapa”;
- questionário com cinco perguntas, progresso de `1 de 5` a `5 de 5` e navegação entre respostas;
- captura de primeiro nome e e-mail, com validação local e consentimento opcional para receber materiais;
- resultado calculado a partir das cinco respostas, com cinco padrões possíveis;
- rodapé com acesso ao Instagram e às páginas legais;
- páginas `/privacidade` e `/termos`;
- correção para desenvolvimento em `127.0.0.1`, permitindo que os chunks do Next sejam carregados corretamente nesse host.

As etapas do questionário são estados React na mesma página; por isso a URL não muda durante as cinco perguntas.

## Limitações conhecidas

Esta é uma reprodução local do fluxo visual e interativo. Ainda não foram reproduzidos os serviços remotos da aplicação original:

- as respostas, o nome e o e-mail permanecem apenas no estado do navegador;
- não há persistência em Supabase ou outro banco;
- não há envio de e-mail ou integração de marketing;
- a devolutiva é calculada localmente por `deriveCategory`, sem geração por IA ou chamada a API;
- recarregar a página reinicia o preenchimento.

Antes de uma publicação real, a persistência, o tratamento de dados pessoais, o envio de materiais e a observabilidade precisam ser definidos e implementados separadamente.

## Fluxo da aplicação

```text
Tela inicial
    -> 5 perguntas com progresso
    -> captura de nome e e-mail
    -> devolutiva local
```

As categorias usadas para a devolutiva são:

- Fome e energia
- Emoções e recompensa
- Rotina e ambiente
- Regras rígidas
- Piloto automático

## Stack

- Next.js 16.3 com App Router
- React 19
- TypeScript em modo strict
- Tailwind CSS v4
- `output: "standalone"` para execução em produção com Node ou Docker

## Executar localmente

Requisitos: Node.js 24 ou superior e npm.

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000` ou `http://127.0.0.1:3000`.

## Validação

```bash
npm run lint
npm run typecheck
npm run build
```

O build gera as rotas estáticas `/`, `/privacidade` e `/termos`.

## Execução em produção

Para executar com Node:

```bash
npm ci
npm run build
npm start
```

Para usar o container de produção:

```bash
docker compose up app --build
```

O `Dockerfile` usa a saída standalone do Next e expõe a porta `3000`. Variáveis de ambiente devem ser fornecidas pelo ambiente de execução; não devem ser gravadas no repositório.

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Fluxo completo do mapa |
| `/privacidade` | Política de privacidade |
| `/termos` | Termos de uso |

## Estrutura principal

```text
src/app/
  page.tsx                 # entrada do fluxo
  privacidade/page.tsx     # política de privacidade
  termos/page.tsx          # termos de uso
  globals.css              # estilos globais e do clone
src/components/sites/mapa-binutricionista.lovable.app-a2f84283/
  root-8a5edab2/           # componentes, perguntas e padrões da reprodução
next.config.ts             # standalone e host local permitido no dev
Dockerfile                 # imagem de produção
```

## Observação de uso

O conteúdo da devolutiva é educativo e não substitui avaliação nutricional individualizada ou atendimento profissional de saúde.
