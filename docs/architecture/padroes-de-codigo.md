# Padrões de Código — atividade-aula-09

## Princípios

1. **Domínio puro em `src/lib/`** — sem imports de React.
2. **Componentes finos** — lógica em hooks, UI em components.
3. **Tipos explícitos** — evitar `any`; usar `CommitType`, `HistoryEntry`.
4. **Funções pequenas** — uma responsabilidade por módulo.

## Convenções de nomenclatura

| Artefato | Convenção | Exemplo |
|----------|-----------|---------|
| Componentes React | PascalCase | `CommitForm.tsx` |
| Hooks | camelCase com `use` | `useCommitForm.ts` |
| Lib / utils | camelCase arquivo | `buildCommitMessage.ts` |
| Tipos | PascalCase | `HistoryEntry` |
| Constantes | SCREAMING_SNAKE | `MAX_ENTRIES` |
| Testes | `*.test.ts` ao lado ou em `__tests__` | `buildCommitMessage.test.ts` |

## Estrutura de componente

```tsx
interface CommitPreviewProps {
  message: string;
  warnings: string[];
}

export function CommitPreview({ message, warnings }: CommitPreviewProps) {
  return (/* JSX */);
}
```

## Imports

Ordem: React → libs externas → `@/` internos → tipos → estilos.

```tsx
import { useMemo } from 'react';
import { buildCommitMessage } from '@/lib/buildCommitMessage';
import type { CommitFormInput } from '@/types/commit';
```

Alias `@/` → `src/` configurado em `vite.config.ts` e `tsconfig.json`.

## Testes

- Arrange / Act / Assert.
- Nome: `describe('buildCommitMessage')` + `it('formats with scope')`.
- Mock apenas boundaries (clipboard, localStorage), não domínio.

## Git commits (meta)

Seguir Conventional Commits — a própria ferramenta do projeto.

## Acessibilidade

- Todo input com `<label htmlFor="...">`.
- Botões com texto visível ou `aria-label`.
- Estados disabled com `aria-disabled` quando relevante.
