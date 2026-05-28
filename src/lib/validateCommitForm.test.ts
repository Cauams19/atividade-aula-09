import { describe, expect, it } from 'vitest'
import { validateCommitForm } from './validateCommitForm'
import type { CommitFormInput } from '@/types/commit'

const validInput: CommitFormInput = {
  type: 'feat',
  scope: 'auth',
  description: 'add login form',
}

describe('validateCommitForm', () => {
  it('accepts valid input with scope', () => {
    const result = validateCommitForm(validInput)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('accepts valid input without scope', () => {
    const result = validateCommitForm({ ...validInput, scope: '' })
    expect(result.valid).toBe(true)
  })

  it('rejects invalid scope characters', () => {
    const result = validateCommitForm({ ...validInput, scope: 'Auth_UI' })
    expect(result.valid).toBe(false)
    expect(result.errors.scope).toBeDefined()
  })

  it('rejects description shorter than 3 characters', () => {
    const result = validateCommitForm({ ...validInput, description: 'ab' })
    expect(result.valid).toBe(false)
    expect(result.errors.description).toMatch(/Mínimo 3/)
  })

  it('rejects description longer than 72 characters', () => {
    const result = validateCommitForm({
      ...validInput,
      description: 'a'.repeat(73),
    })
    expect(result.valid).toBe(false)
    expect(result.errors.description).toMatch(/Máximo 72/)
  })

  it('rejects invalid commit type', () => {
    const result = validateCommitForm({
      ...validInput,
      type: 'invalid' as CommitFormInput['type'],
    })
    expect(result.valid).toBe(false)
    expect(result.errors.type).toBeDefined()
  })
})
