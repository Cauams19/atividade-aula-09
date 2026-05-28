export function StorageBanner() {
  return (
    <div
      role="status"
      className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200"
      data-testid="storage-banner"
    >
      O histórico local não está disponível neste navegador. As mensagens não
      serão salvas após copiar.
    </div>
  )
}
