import type { CommitFormInput, CommitMessageResult } from '@/types/commit'

export function buildCommitMessage(input: CommitFormInput): CommitMessageResult {
  const scope = input.scope.trim()
  const description = input.description.trim()
  const warnings: string[] = []

  if (description.length > 0) {
    const first = description[0]
    if (first === first.toUpperCase() && first !== first.toLowerCase()) {
      warnings.push('Descrição deve começar em minúsculas.')
    }
    if (description.endsWith('.')) {
      warnings.push('Descrição não deve terminar com ponto final.')
    }
  }

  const header = scope
    ? `${input.type}(${scope}): ${description}`
    : `${input.type}: ${description}`

  return { message: header, warnings }
}
