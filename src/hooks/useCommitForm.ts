import { useCallback, useMemo, useState } from 'react'
import { validateCommitForm } from '@/lib/validateCommitForm'
import {
  DEFAULT_COMMIT_FORM,
  type CommitFormInput,
  type CommitType,
} from '@/types/commit'

export function useCommitForm(initial: CommitFormInput = DEFAULT_COMMIT_FORM) {
  const [input, setInput] = useState<CommitFormInput>(initial)

  const validation = useMemo(() => validateCommitForm(input), [input])

  const setType = useCallback((type: CommitType) => {
    setInput((prev) => ({ ...prev, type }))
  }, [])

  const setScope = useCallback((scope: string) => {
    setInput((prev) => ({ ...prev, scope }))
  }, [])

  const setDescription = useCallback((description: string) => {
    setInput((prev) => ({ ...prev, description }))
  }, [])

  const reset = useCallback(() => {
    setInput(DEFAULT_COMMIT_FORM)
  }, [])

  const setInputValues = useCallback((values: CommitFormInput) => {
    setInput(values)
  }, [])

  return {
    input,
    errors: validation.errors,
    valid: validation.valid,
    setType,
    setScope,
    setDescription,
    reset,
    setInputValues,
  }
}
