# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-27

### Added

- **Commit generator** — form with type, optional scope, and description validation
- **Live preview** — Conventional Commit message updates as you type
- **Copy to clipboard** — primary CTA with success/error feedback and `execCommand` fallback
- **localStorage history** — up to 50 entries (FIFO), versioned schema `commit-generator:history:v1`
- **History list** — browse, reuse (fills form + scroll to top), and copy per item
- **Clear history** — confirmation dialog (`<dialog>`) with destructive action
- **UX polish** — dark mode via `prefers-color-scheme`, skip link, SEO/OG meta tags
- **CI** — GitHub Actions (lint, typecheck, test, build)
- **Deploy config** — `vercel.json` for static Vite build

### Technical

- React 19 · Vite 6 · TypeScript 5 · Tailwind CSS 4
- 62 automated tests (Vitest + Testing Library)
- Lighthouse Performance score 99 on production build

[1.0.0]: https://github.com/Cauams19/atividade-aula-09/releases/tag/v1.0.0
