# Árvore de Origem — atividade-aula-09

Estrutura alvo após Epic 1 (scaffold + core):

```
atividade-aula-09/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docs/
│   ├── architecture/
│   │   ├── arvore-de-origem.md      ← este arquivo
│   │   ├── padroes-de-codigo.md
│   │   └── pilha-tecnologica.md
│   ├── architecture.md
│   ├── prd.md
│   └── stories/                     ← stories @sm
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CommitForm.tsx
│   │   ├── CommitPreview.tsx
│   │   ├── CopyButton.tsx
│   │   ├── HistoryList.tsx
│   │   ├── HistoryItem.tsx
│   │   ├── ClearHistoryDialog.tsx
│   │   └── StorageBanner.tsx
│   ├── hooks/
│   │   ├── useCommitForm.ts
│   │   ├── useHistory.ts
│   │   └── useClipboard.ts
│   ├── lib/
│   │   ├── buildCommitMessage.ts
│   │   ├── buildCommitMessage.test.ts
│   │   ├── validateCommitForm.ts
│   │   ├── validateCommitForm.test.ts
│   │   └── historyStorage.ts
│   ├── types/
│   │   └── commit.ts
│   ├── App.tsx
│   ├── App.css                    ← mínimo; preferir Tailwind
│   ├── index.css                  ← @tailwind directives
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── vercel.json
└── README.md
```

## Responsabilidade por pasta

| Pasta | Conteúdo permitido |
|-------|-------------------|
| `src/lib/` | Funções puras, zero JSX |
| `src/hooks/` | Estado e efeitos React |
| `src/components/` | Apresentação e eventos UI |
| `src/types/` | Interfaces e constantes de tipo |
| `docs/` | Documentação humana/AI |
