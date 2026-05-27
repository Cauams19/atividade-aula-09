# atividade-aula-09 — Product Requirements Document (PRD)

**Versão:** 1.0  
**Status:** Draft  
**Autor:** Morgan (@pm)  
**Data:** 2026-05-27

---

## Goals and Background Context

### Goals

- Permitir que desenvolvedores gerem mensagens de commit no padrão **Conventional Commits** de forma rápida e sem erros de formatação.
- Oferecer uma **interface web simples** onde o usuário informa tipo, escopo e descrição e recebe a mensagem pronta para copiar.
- Manter um **histórico local** das mensagens geradas, sem backend nem banco de dados.
- Publicar a aplicação na **Vercel** com deploy reproduzível e custo zero para o MVP.

### Background Context

Mensagens de commit inconsistentes dificultam leitura de changelogs, automação de releases e revisão de histórico no Git. O padrão Conventional Commits (`type(scope): description`) é amplamente adotado, mas exige disciplina e conhecimento dos tipos válidos (`feat`, `fix`, `docs`, etc.).

Esta ferramenta resolve o problema para o fluxo individual do desenvolvedor: preencher três campos, gerar a string correta, copiar e opcionalmente recuperar gerações anteriores via `localStorage`. Não há autenticação, multi-usuário nem sincronização entre dispositivos — escopo intencionalmente enxuto para entrega rápida e deploy estático/serverless na Vercel.

### Change Log

| Date       | Version | Description                          | Author   |
|------------|---------|--------------------------------------|----------|
| 2026-05-27 | 1.0     | PRD inicial — gerador Conventional Commits | Morgan |

---

## Requirements

### Functional

1. **FR1:** O usuário deve selecionar o **tipo** de mudança entre os tipos Conventional Commits suportados: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
2. **FR2:** O usuário deve informar um **escopo** opcional (texto curto, ex.: `auth`, `ui`, `api`); quando vazio, a mensagem não inclui parênteses de escopo.
3. **FR3:** O usuário deve informar uma **descrição curta** em imperativo, minúsculas, sem ponto final (validação com aviso amigável se violar convenção).
4. **FR4:** O sistema deve **gerar automaticamente** a mensagem no formato:
   - Com escopo: `type(scope): description`
   - Sem escopo: `type: description`
5. **FR5:** O usuário deve poder **copiar** a mensagem gerada para a área de transferência com um clique e feedback visual de sucesso.
6. **FR6:** O sistema deve **persistir no localStorage** cada mensagem gerada com: timestamp, tipo, escopo, descrição e mensagem completa.
7. **FR7:** O usuário deve visualizar o **histórico** das mensagens (mais recentes primeiro), com opção de reutilizar (preencher formulário) ou copiar novamente.
8. **FR8:** O usuário deve poder **limpar o histórico** com confirmação explícita.
9. **FR9:** A aplicação deve funcionar **offline após primeiro carregamento** (assets estáticos + localStorage), exceto se houver dependência de CDN externa documentada.
10. **FR10:** Deve existir **preview em tempo real** da mensagem conforme o usuário preenche os campos.

### Non Functional

1. **NFR1:** Tempo de carregamento inicial (LCP) &lt; 2,5s em conexão 4G simulada.
2. **NFR2:** Interface **responsiva** (mobile-first), utilizável em viewport ≥ 320px.
3. **NFR3:** Acessibilidade mínima **WCAG 2.1 AA** para formulário, botões e lista de histórico (labels, contraste, foco visível).
4. **NFR4:** Sem banco de dados, APIs proprietárias ou autenticação no MVP.
5. **NFR5:** Código versionado no repositório `atividade-aula-09` com deploy automatizado na Vercel.
6. **NFR6:** `localStorage` limitado a no máximo **50 entradas** no histórico (FIFO ao exceder).
7. **NFR7:** Compatibilidade com últimas duas versões estáveis de Chrome, Firefox, Safari e Edge.

---

## User Interface Design Goals

### Overall UX Vision

Interface minimalista, uma única página: formulário no topo, preview da mensagem em destaque, ações de copiar/gerar, e histórico colapsável abaixo. Tom profissional-dev (tipografia monoespaçada na preview). Zero fricção — o usuário completa em menos de 30 segundos.

### Key Interaction Paradigms

- **Formulário guiado** com selects e inputs validados inline.
- **Preview ao vivo** — atualização instantânea sem submit de página.
- **Ação primária única** — "Copiar mensagem" como CTA principal.
- **Histórico como memória local** — cards clicáveis para reutilizar valores.

### Core Screens and Views

| Tela / View        | Propósito                                              |
|--------------------|--------------------------------------------------------|
| Gerador (home)     | Formulário + preview + copiar                          |
| Histórico          | Lista de commits gerados (mesma página, seção inferior) |
| Estado vazio       | Mensagem quando histórico está vazio                   |
| Confirmação limpar | Modal/dialog antes de apagar histórico                 |

### Accessibility

**WCAG 2.1 AA** — labels associados, `aria-live` na preview ao copiar, navegação por teclado completa.

### Branding

Visual limpo, tema claro padrão com suporte opcional a **dark mode** (preferência do sistema via `prefers-color-scheme`). Sem identidade corporativa fixa no MVP.

### Target Device and Platforms

**Web Responsive** — desktop e mobile. Deploy como SPA ou Next.js estático na Vercel.

---

## Technical Assumptions

### Repository Structure

**Monorepo simples** — aplicação front-end na raiz ou em `apps/web/`; sem microsserviços.

### Service Architecture

**SPA estática / Jamstack** — sem servidor de aplicação no MVP. Lógica de geração e persistência 100% no cliente (`localStorage`). Vercel hospeda build estático.

**Stack recomendada (MVP):**

| Camada        | Escolha              | Racional                                      |
|---------------|----------------------|-----------------------------------------------|
| Framework     | **React 19 + Vite**  | Leve, rápido, ideal para SPA sem SSR          |
| Linguagem     | **TypeScript**       | Tipagem para tipos de commit e modelo de dados |
| Estilo        | **Tailwind CSS**     | UI responsiva com pouco CSS customizado       |
| Testes        | **Vitest + RTL**     | Unitários para gerador e storage                |
| Deploy        | **Vercel**           | Requisito explícito do produto                |
| CI            | GitHub Actions (lint + test) | Quality gate antes do merge          |

*Alternativa aceitável:* Next.js (App Router) em modo estático/export se o @architect preferir — decisão final na arquitetura.

### Testing Requirements

- **Unitários:** função de montagem da mensagem, validações, serialização/deserialização do histórico.
- **Integração leve:** fluxo formulário → preview → copiar (Testing Library).
- **E2E:** opcional no MVP (Playwright) — apenas se tempo permitir; não bloqueante.

### Additional Technical Assumptions

- Chave `localStorage`: `commit-generator:history:v1` (versionada para migrações futuras).
- Clipboard API com fallback `document.execCommand('copy')` para contextos restritos.
- Variáveis de ambiente na Vercel apenas se necessário (projeto pode não precisar de nenhuma no MVP).
- Conventional Commits spec como referência: https://www.conventionalcommits.org/

---

## Epic List

| # | Epic | Objetivo |
|---|------|----------|
| 1 | **Foundation & Commit Generator Core** | Scaffold do projeto, UI do gerador, lógica Conventional Commits, copiar e deploy Vercel |
| 2 | **History & UX Polish** | Persistência localStorage, histórico, reutilização, limpar, acessibilidade e refinamentos |

*Rationale:* Dois epics entregam valor incremental — Epic 1 já é utilizável sem histórico; Epic 2 completa a proposta do produto.

---

## Epic 1: Foundation & Commit Generator Core

**Objetivo:** Estabelecer o projeto web, implementar o formulário e a geração de mensagens Conventional Commits com cópia para clipboard, e publicar na Vercel uma versão funcional mínima.

### Story 1.1: Project Scaffold & Vercel Deploy Pipeline

As a **developer**,  
I want **a configured React/Vite/TypeScript project with Vercel deployment**,  
so that **the team has a reproducible base to build features**.

**Acceptance Criteria:**

1. Repositório contém app Vite + React + TypeScript + Tailwind configurados.
2. Scripts `dev`, `build`, `lint`, `test` definidos no `package.json`.
3. `vercel.json` ou configuração equivalente para build estático.
4. Deploy de preview na Vercel funciona a partir do branch `main`.
5. README documenta comandos locais e URL de produção.

### Story 1.2: Commit Message Generator Form

As a **user**,  
I want **to select commit type, optional scope, and enter a description**,  
so that **I can define all inputs needed for a conventional commit**.

**Acceptance Criteria:**

1. Select com todos os tipos listados em FR1.
2. Campo escopo opcional com validação de caracteres (letras, números, hífen).
3. Campo descrição obrigatório com validação de comprimento (3–72 caracteres).
4. Mensagens de erro acessíveis abaixo dos campos inválidos.
5. Layout responsivo em mobile e desktop.

### Story 1.3: Live Preview & Conventional Commit Formatting

As a **user**,  
I want **to see the formatted commit message update as I type**,  
so that **I know exactly what will be copied**.

**Acceptance Criteria:**

1. Preview exibe `type(scope): description` ou `type: description` conforme FR4.
2. Atualização em tempo real sem reload (FR10).
3. Função pura `buildCommitMessage(type, scope, description)` coberta por testes unitários.
4. Aviso não bloqueante se descrição começar com maiúscula ou terminar com ponto.

### Story 1.4: Copy to Clipboard

As a **user**,  
I want **to copy the generated message with one click**,  
so that **I can paste it directly into my Git client**.

**Acceptance Criteria:**

1. Botão "Copiar" copia a mensagem completa (FR5).
2. Feedback visual e `aria-live` anunciam sucesso ou falha.
3. Botão desabilitado quando formulário inválido.
4. Teste unitário ou integração do fluxo de cópia (mock de clipboard).

---

## Epic 2: History & UX Polish

**Objetivo:** Adicionar persistência local do histórico, permitir reutilização e limpeza, e polir acessibilidade e experiência visual.

### Story 2.1: localStorage History Persistence

As a **user**,  
I want **my generated messages saved locally**,  
so that **I can refer back to recent commits without retyping**.

**Acceptance Criteria:**

1. Cada geração/cópia bem-sucedida salva entrada com id, timestamp, campos e mensagem (FR6).
2. Máximo 50 entradas; entrada mais antiga removida ao exceder (NFR6).
3. Histórico sobrevive refresh da página.
4. Tratamento gracioso se `localStorage` indisponível (mensagem ao usuário).
5. Testes unitários para append, limit e parse.

### Story 2.2: History List UI — Reuse & Recopy

As a **user**,  
I want **to browse and reuse past commit messages**,  
so that **I can speed up similar commits**.

**Acceptance Criteria:**

1. Lista ordenada por data decrescente (FR7).
2. Ação "Reutilizar" preenche o formulário com os campos salvos.
3. Ação "Copiar" em cada item do histórico.
4. Estado vazio amigável quando não há histórico.
5. Seção acessível por teclado e leitores de tela.

### Story 2.3: Clear History & UX Polish

As a **user**,  
I want **to clear my history and use a polished interface**,  
so that **I control my local data and enjoy a pleasant experience**.

**Acceptance Criteria:**

1. Botão "Limpar histórico" exige confirmação (FR8).
2. Dark mode respeita `prefers-color-scheme` (opcional toggle manual — nice-to-have).
3. Revisão WCAG AA nos componentes principais (NFR3).
4. Meta tags básicas (title, description) para SEO mínimo.
5. Lighthouse Performance ≥ 90 em build de produção.

---

## Checklist Results Report

_Pendente — executar `pm-checklist` após revisão do stakeholder._

| Área              | Status   | Notas                                      |
|-------------------|----------|--------------------------------------------|
| Goals definidos   | ✅ Pass  | Alinhado ao pedido do usuário              |
| FR/NFR completos  | ✅ Pass  | MVP escopo fechado                         |
| Epics sequenciais | ✅ Pass  | Epic 1 deployável sem Epic 2               |
| Stories sized     | ✅ Pass  | Adequadas para sessão de agente @dev       |
| UX/UI goals       | ✅ Pass  | UI simples documentada                     |
| Tech assumptions  | ✅ Pass  | Vercel + localStorage + sem DB             |

---

## Next Steps

### UX Expert Prompt

```
@ux-design-expert Revise o PRD em docs/prd.md para o gerador de Conventional Commits.
Produza wireframe de página única: formulário (tipo, escopo, descrição), preview monoespaçada,
CTA copiar, e seção de histórico. Foco em mobile-first e WCAG AA. Sem backend.
```

### Architect Prompt

```
@architect Crie docs/architecture.md a partir de docs/prd.md.
Stack sugerida: React + Vite + TypeScript + Tailwind, SPA estática na Vercel,
localStorage para histórico. Defina estrutura de pastas, contratos da função
buildCommitMessage, schema do histórico e pipeline CI/CD.
```

---

*— Morgan, estrategista de produto 📋*
