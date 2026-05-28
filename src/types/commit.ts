export const COMMIT_TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
] as const

export type CommitType = (typeof COMMIT_TYPES)[number]

export interface CommitFormInput {
  type: CommitType
  scope: string
  description: string
}

export interface CommitMessageResult {
  message: string
  warnings: string[]
}

export interface HistoryEntry {
  id: string
  createdAt: string
  type: CommitType
  scope: string
  description: string
  message: string
}

export interface HistoryStore {
  version: 1
  entries: HistoryEntry[]
}

export const DEFAULT_COMMIT_FORM: CommitFormInput = {
  type: 'feat',
  scope: '',
  description: '',
}
