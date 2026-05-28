import type { HistoryEntry } from '@/types/commit'
import { HistoryItem } from './HistoryItem'

export interface HistoryListProps {
  entries: HistoryEntry[]
  onReuse: (entry: HistoryEntry) => void
}

function sortEntriesDesc(entries: HistoryEntry[]): HistoryEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function HistoryList({ entries, onReuse }: HistoryListProps) {
  if (entries.length === 0) {
    return (
      <div
        className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center dark:border-slate-700 dark:bg-slate-800/50"
        data-testid="history-empty"
      >
        <p className="text-4xl" aria-hidden="true">
          📋
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400" role="status">
          Nenhum commit gerado ainda.
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          Gere e copie uma mensagem para vê-la aqui.
        </p>
      </div>
    )
  }

  const sorted = sortEntriesDesc(entries)

  return (
    <ul
      className="grid list-none gap-4 p-0 lg:grid-cols-2"
      aria-label="Lista de commits salvos"
      data-testid="history-list"
    >
      {sorted.map((entry) => (
        <HistoryItem key={entry.id} entry={entry} onReuse={onReuse} />
      ))}
    </ul>
  )
}
