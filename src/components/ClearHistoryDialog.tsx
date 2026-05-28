import { useEffect, useRef } from 'react'

export interface ClearHistoryDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ClearHistoryDialog({
  open,
  onClose,
  onConfirm,
}: ClearHistoryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      return
    }

    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto max-w-md w-[calc(100%-2rem)] rounded-lg border border-slate-200 bg-white p-6 text-slate-900 shadow-xl open:flex open:flex-col [&::backdrop]:bg-black/50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
      aria-labelledby="clear-history-title"
      aria-describedby="clear-history-desc"
      data-testid="clear-history-dialog"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 id="clear-history-title" className="text-lg font-semibold">
          Limpar histórico?
        </h3>
        <button
          type="button"
          className="min-h-11 min-w-11 rounded-lg px-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          aria-label="Fechar diálogo"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <p
        id="clear-history-desc"
        className="mt-3 text-sm text-slate-600 dark:text-slate-300"
      >
        Esta ação remove todas as mensagens salvas neste navegador. Não pode
        desfazer.
      </p>

      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-800"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="min-h-11 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus-visible:ring-offset-slate-800"
          onClick={handleConfirm}
        >
          Limpar tudo
        </button>
      </div>
    </dialog>
  )
}
