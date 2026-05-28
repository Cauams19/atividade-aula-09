import { useClipboard } from '@/hooks/useClipboard'
import { formatRelativeTime } from '@/lib/formatRelativeTime'
import type { HistoryEntry } from '@/types/commit'

const secondaryButtonClass =
  'min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900'

export interface HistoryItemProps {
  entry: HistoryEntry
  onReuse: (entry: HistoryEntry) => void
}

export function HistoryItem({ entry, onReuse }: HistoryItemProps) {
  const { status, feedbackMessage, copy } = useClipboard()
  const relativeTime = formatRelativeTime(entry.createdAt)
  const copyLabel =
    status === 'success'
      ? 'Copiado'
      : `Copiar mensagem ${entry.message}`

  const handleCopy = async () => {
    await copy(entry.message)
  }

  return (
    <li
      className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      data-testid={`history-item-${entry.id}`}
    >
      <p
        id={`history-message-${entry.id}`}
        className="truncate font-mono text-sm text-slate-900 dark:text-slate-50"
        title={entry.message}
      >
        {entry.message}
      </p>

      <time
        dateTime={entry.createdAt}
        className="mt-2 text-xs text-slate-500 dark:text-slate-400"
      >
        {relativeTime}
      </time>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={() => onReuse(entry)}
          aria-describedby={`history-message-${entry.id}`}
        >
          Reutilizar
        </button>
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={() => void handleCopy()}
          disabled={status === 'success'}
          aria-label={copyLabel}
        >
          {status === 'success' ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {feedbackMessage ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-2 text-xs ${
            status === 'error'
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-700 dark:text-green-400'
          }`}
          data-testid={`history-copy-feedback-${entry.id}`}
        >
          {feedbackMessage}
        </p>
      ) : null}
    </li>
  )
}
