import { useCallback, useEffect, useState } from 'react'
import {
  appendHistory as persistEntry,
  createHistoryEntry,
  isLocalStorageAvailable,
  loadHistory,
} from '@/lib/historyStorage'
import type { CommitFormInput, HistoryEntry } from '@/types/commit'

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [storageAvailable, setStorageAvailable] = useState(true)

  useEffect(() => {
    const available = isLocalStorageAvailable()
    setStorageAvailable(available)
    if (available) {
      setEntries(loadHistory())
    }
  }, [])

  const appendFromCopy = useCallback(
    (input: CommitFormInput, message: string) => {
      if (!isLocalStorageAvailable()) {
        setStorageAvailable(false)
        return
      }

      const entry = createHistoryEntry(input, message)
      const next = persistEntry(entry)
      setEntries(next)
    },
    [],
  )

  return {
    entries,
    storageAvailable,
    appendFromCopy,
  }
}
