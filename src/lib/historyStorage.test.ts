import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  appendHistory,
  createHistoryEntry,
  HISTORY_STORAGE_KEY,
  loadHistory,
  MAX_HISTORY_ENTRIES,
} from './historyStorage'
import type { CommitFormInput } from '@/types/commit'

function createMemoryStorage(): Storage {
  const store = new Map<string, string>()
  return {
    get length() {
      return store.size
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => [...store.keys()][index] ?? null,
    removeItem: (key) => store.delete(key),
    setItem: (key, value) => store.set(key, value),
  }
}

const sampleInput: CommitFormInput = {
  type: 'feat',
  scope: 'auth',
  description: 'add login',
}

describe('historyStorage', () => {
  let storage: Storage

  beforeEach(() => {
    storage = createMemoryStorage()
    vi.stubGlobal('window', { localStorage: storage })
  })

  it('appends entry with id and timestamp', () => {
    const entry = createHistoryEntry(sampleInput, 'feat(auth): add login')
    const entries = appendHistory(entry, storage)

    expect(entries).toHaveLength(1)
    expect(entries[0].id).toBe(entry.id)
    expect(entries[0].createdAt).toBe(entry.createdAt)
    expect(entries[0].message).toBe('feat(auth): add login')
  })

  it('persists across loadHistory calls', () => {
    appendHistory(createHistoryEntry(sampleInput, 'feat: first'), storage)
    appendHistory(createHistoryEntry(sampleInput, 'feat: second'), storage)

    const loaded = loadHistory(storage)
    expect(loaded).toHaveLength(2)
    expect(loaded[0].message).toBe('feat: second')
    expect(loaded[1].message).toBe('feat: first')
  })

  it('limits history to MAX_ENTRIES with FIFO', () => {
    for (let i = 0; i < MAX_HISTORY_ENTRIES + 5; i += 1) {
      appendHistory(
        createHistoryEntry(sampleInput, `feat: item ${i}`),
        storage,
      )
    }

    const loaded = loadHistory(storage)
    expect(loaded).toHaveLength(MAX_HISTORY_ENTRIES)
    expect(loaded[0].message).toBe(`feat: item ${MAX_HISTORY_ENTRIES + 4}`)
    expect(loaded.at(-1)?.message).toBe('feat: item 5')
  })

  it('returns empty array for corrupt JSON', () => {
    storage.setItem(HISTORY_STORAGE_KEY, '{not-json')
    expect(loadHistory(storage)).toEqual([])
  })

  it('filters invalid entries when parsing', () => {
    storage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        entries: [
          createHistoryEntry(sampleInput, 'feat: ok'),
          { id: 'x', bad: true },
        ],
      }),
    )

    expect(loadHistory(storage)).toHaveLength(1)
  })
})
