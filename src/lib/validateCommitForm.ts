import {
  COMMIT_TYPES,
  type CommitFormInput,
  type CommitType,
} from '@/types/commit'

const SCOPE_REGEX = /^[a-z0-9-]*$/
const DESC_MIN = 3
const DESC_MAX = 72

export interface ValidationResult {
  valid: boolean
  errors: Partial<Record<'type' | 'scope' | 'description', string>>
}

export function validateCommitForm(input: CommitFormInput): ValidationResult {
  const errors: ValidationResult['errors'] = {}
  const scope = input.scope.trim()
  const description = input.description.trim()

  if (!COMMIT_TYPES.includes(input.type as CommitType)) {
    errors.type = 'Tipo inválido.'
  }
  if (scope && !SCOPE_REGEX.test(scope)) {
    errors.scope = 'Escopo: apenas letras minúsculas, números e hífen.'
  }
  if (description.length < DESC_MIN) {
    errors.description = `Mínimo ${DESC_MIN} caracteres.`
  } else if (description.length > DESC_MAX) {
    errors.description = `Máximo ${DESC_MAX} caracteres.`
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
