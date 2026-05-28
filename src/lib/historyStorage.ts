import { COMMIT_TYPES, type CommitFormInput, type CommitType, type HistoryEntry, type HistoryStore } from '@/types/commit'

export const HISTORY_STORAGE_KEY = 'commit-generator:history:v1'
export const MAX_HISTORY_ENTRIES = 50

export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false
  }

  try {
    const probe = '__commitgen_storage_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return true
  } catch {
    return false
  }
}

function isCommitType(value: unknown): value is CommitType {
  return typeof value === 'string' && COMMIT_TYPES.includes(value as CommitType)
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Record<string, unknown>
  return (
    typeof entry.id === 'string' &&
    typeof entry.createdAt === 'string' &&
    isCommitType(entry.type) &&
    typeof entry.scope === 'string' &&
    typeof entry.description === 'string' &&
    typeof entry.message === 'string'
  )
}

function parseStore(raw: string | null): HistoryStore {
  if (!raw) {
    return { version: 1, entries: [] }
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      (parsed as HistoryStore).version !== 1 ||
      !Array.isArray((parsed as HistoryStore).entries)
    ) {
      return { version: 1, entries: [] }
    }

    const entries = (parsed as HistoryStore).entries.filter(isHistoryEntry)
    return { version: 1, entries }
  } catch {
    return { version: 1, entries: [] }
  }
}

function canUseStorage(storage: Storage): boolean {
  if (storage !== localStorage) return true
  return isLocalStorageAvailable()
}

export function loadHistory(storage: Storage = localStorage): HistoryEntry[] {
  if (!canUseStorage(storage)) {
    return []
  }

  const store = parseStore(storage.getItem(HISTORY_STORAGE_KEY))
  return [...store.entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

function saveHistory(entries: HistoryEntry[], storage: Storage = localStorage): void {
  const payload: HistoryStore = { version: 1, entries }
  storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(payload))
}

export function createHistoryEntry(
  input: CommitFormInput,
  message: string,
): HistoryEntry {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    type: input.type,
    scope: input.scope.trim(),
    description: input.description.trim(),
    message,
  }
}

export function appendHistory(
  entry: HistoryEntry,
  storage: Storage = localStorage,
): HistoryEntry[] {
  if (!canUseStorage(storage)) {
    return []
  }

  const current = loadHistory(storage)
  const next = [entry, ...current].slice(0, MAX_HISTORY_ENTRIES)
  saveHistory(next, storage)
  return next
}

export function clearHistory(storage: Storage = localStorage): void {
  storage.removeItem(HISTORY_STORAGE_KEY)
}
