import { describe, expect, it } from 'vitest'
import { buildCommitMessage } from './buildCommitMessage'
import type { CommitFormInput } from '@/types/commit'

const base: CommitFormInput = {
  type: 'feat',
  scope: 'auth',
  description: 'add login form',
}

describe('buildCommitMessage', () => {
  it('formats message with scope', () => {
    const { message, warnings } = buildCommitMessage(base)
    expect(message).toBe('feat(auth): add login form')
    expect(warnings).toEqual([])
  })

  it('formats message without scope', () => {
    const { message } = buildCommitMessage({ ...base, scope: '' })
    expect(message).toBe('feat: add login form')
  })

  it('trims scope and description', () => {
    const { message } = buildCommitMessage({
      ...base,
      scope: '  ui  ',
      description: '  fix button  ',
    })
    expect(message).toBe('feat(ui): fix button')
  })

  it('ignores whitespace-only scope', () => {
    const { message } = buildCommitMessage({ ...base, scope: '   ' })
    expect(message).toBe('feat: add login form')
  })

  it('warns when description starts with uppercase', () => {
    const { warnings } = buildCommitMessage({
      ...base,
      description: 'Add login form',
    })
    expect(warnings).toContain('Descrição deve começar em minúsculas.')
  })

  it('warns when description ends with period', () => {
    const { warnings } = buildCommitMessage({
      ...base,
      description: 'add login form.',
    })
    expect(warnings).toContain('Descrição não deve terminar com ponto final.')
  })

  it('returns both warnings when applicable', () => {
    const { warnings } = buildCommitMessage({
      ...base,
      description: 'Add login form.',
    })
    expect(warnings).toHaveLength(2)
  })

  it('does not warn for empty description', () => {
    const { message, warnings } = buildCommitMessage({
      ...base,
      description: '',
    })
    expect(message).toBe('feat(auth): ')
    expect(warnings).toEqual([])
  })

  it('does not warn for numeric description start', () => {
    const { warnings } = buildCommitMessage({
      ...base,
      description: '2fa support',
    })
    expect(warnings).toEqual([])
  })
})
