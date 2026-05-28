import { renderHook, act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useHistory } from './useHistory'
import { HISTORY_STORAGE_KEY } from '@/lib/historyStorage'

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

describe('useHistory', () => {
  beforeEach(() => {
    const storage = createMemoryStorage()
    vi.stubGlobal('window', { localStorage: storage })
    vi.stubGlobal('localStorage', storage)
  })

  it('loads empty history on mount', () => {
    const { result } = renderHook(() => useHistory())
    expect(result.current.entries).toEqual([])
    expect(result.current.storageAvailable).toBe(true)
  })

  it('appends entry after copy', () => {
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.appendFromCopy(
        { type: 'feat', scope: 'ui', description: 'add button' },
        'feat(ui): add button',
      )
    })

    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].message).toBe('feat(ui): add button')
    expect(localStorage.getItem(HISTORY_STORAGE_KEY)).toContain('feat(ui): add button')
  })
})
