import { useClipboard, type ClipboardStatus } from '@/hooks/useClipboard'

export interface CopyButtonProps {
  text: string
  disabled?: boolean
  onCopySuccess?: () => void
}

function buttonLabel(status: ClipboardStatus): string {
  if (status === 'success') return 'Copiado!'
  return 'Copiar mensagem'
}

export function CopyButton({
  text,
  disabled = false,
  onCopySuccess,
}: CopyButtonProps) {
  const { status, feedbackMessage, copy } = useClipboard()
  const isDisabled = disabled || status === 'success'

  const handleCopy = async () => {
    const ok = await copy(text)
    if (ok) {
      onCopySuccess?.()
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => void handleCopy()}
        className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-base font-medium text-white transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-900 ${
          status === 'success'
            ? 'bg-green-600 hover:bg-green-600'
            : 'bg-blue-600 hover:bg-blue-700 active:scale-[1.02] dark:bg-blue-500 dark:hover:bg-blue-600'
        }`}
        aria-disabled={isDisabled}
      >
        <span aria-hidden="true">📋</span>
        {buttonLabel(status)}
      </button>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-2 min-h-[1.25rem] text-sm"
        data-testid="copy-feedback"
      >
        {feedbackMessage ? (
          <p
            className={
              status === 'error'
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-700 dark:text-green-400'
            }
          >
            {feedbackMessage}
          </p>
        ) : null}
      </div>
    </div>
  )
}
