export interface CommitPreviewProps {
  message: string
  warnings: string[]
}

export function CommitPreview({ message, warnings }: CommitPreviewProps) {
  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
        Preview
      </h3>

      <div
        className="min-h-[4.5rem] flex-1 rounded-lg border border-slate-200 bg-slate-100 p-4 dark:border-slate-600 dark:bg-slate-800"
        aria-label="Preview da mensagem de commit"
      >
        <p
          className="break-all font-mono text-base leading-relaxed text-slate-900 select-all dark:text-slate-50"
          data-testid="commit-preview-message"
        >
          {message || (
            <span className="text-slate-400 dark:text-slate-500">
              Preencha os campos para ver a mensagem
            </span>
          )}
        </p>
      </div>

      {warnings.length > 0 ? (
        <ul
          className="mt-3 space-y-1"
          aria-label="Avisos de convenção"
          data-testid="commit-preview-warnings"
        >
          {warnings.map((warning) => (
            <li
              key={warning}
              className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400"
            >
              <span aria-hidden="true">⚠</span>
              <span>{warning}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
