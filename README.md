# atividade-aula-09 — CommitGen

[![Release](https://img.shields.io/github/v/release/Cauams19/atividade-aula-09)](https://github.com/Cauams19/atividade-aula-09/releases)

Gerador de mensagens de commit no padrão [Conventional Commits](https://www.conventionalcommits.org/).

## Requisitos

- Node.js 22+
- npm 11+

## Setup local

```bash
npm ci
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Preview do build local |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação TypeScript |
| `npm test` | Testes (Vitest) |

## Deploy (Vercel)

- **Repositório:** https://github.com/Cauams19/atividade-aula-09
- **Produção:** conecte o repo no [dashboard Vercel](https://vercel.com/new) — após o primeiro deploy, a URL aparecerá aqui (ex.: `https://atividade-aula-09.vercel.app`)
- **Preview:** deploy automático em cada Pull Request

Configuração em [`vercel.json`](vercel.json): build estático Vite → `dist/`.

## Stack

- React 19 · Vite 6 · TypeScript 5 · Tailwind CSS 4 · Vitest

## Documentação

- [PRD](docs/prd.md)
- [Architecture](docs/architecture.md)
- [UI/UX Spec](docs/front-end-spec.md)
- [Stories](docs/stories/)

---
*Synkra AIOX · atividade-aula-09*
