import { useState } from 'react'
import { ClearHistoryDialog } from '@/components/ClearHistoryDialog'
import { CommitForm } from '@/components/CommitForm'
import { CommitPreview } from '@/components/CommitPreview'
import { CopyButton } from '@/components/CopyButton'
import { HistoryList } from '@/components/HistoryList'
import { StorageBanner } from '@/components/StorageBanner'
import { useCommitForm } from '@/hooks/useCommitForm'
import { useHistory } from '@/hooks/useHistory'
import type { HistoryEntry } from '@/types/commit'

function App() {
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const {
    input,
    errors,
    preview,
    valid,
    setType,
    setScope,
    setDescription,
    setInputValues,
  } = useCommitForm()
  const { entries, storageAvailable, appendFromCopy, clearAll } = useHistory()

  const handleReuse = (entry: HistoryEntry) => {
    setInputValues({
      type: entry.type,
      scope: entry.scope,
      description: entry.description,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Pular para o conteúdo
      </a>

      <header className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-xl font-semibold">
            <span className="text-blue-600 dark:text-blue-400">◆</span> CommitGen
          </h1>
          <a
            href="#historico"
            className="rounded-md px-2 py-1 text-sm text-slate-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-blue-400 dark:focus-visible:ring-offset-slate-800"
          >
            Histórico
          </a>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-4xl px-4 py-8">
        {!storageAvailable ? <StorageBanner /> : null}
        <h2 className="mb-6 text-lg font-semibold">Nova mensagem</h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <CommitForm
            value={input}
            errors={errors}
            onTypeChange={setType}
            onScopeChange={setScope}
            onDescriptionChange={setDescription}
          />

          <div className="mt-8 flex flex-col lg:mt-0">
            <CommitPreview
              message={preview.message}
              warnings={preview.warnings}
            />
            <CopyButton
              text={preview.message}
              disabled={!valid}
              onCopySuccess={() => appendFromCopy(input, preview.message)}
            />
          </div>
        </div>
      </main>

      <section
        id="historico"
        className="mx-auto max-w-4xl border-t border-slate-200 px-4 py-8 dark:border-slate-700"
        aria-label="Histórico de commits"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Histórico</h2>
          {entries.length > 0 ? (
            <button
              type="button"
              className="min-h-11 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-red-400 dark:focus-visible:ring-offset-slate-900"
              onClick={() => setClearDialogOpen(true)}
            >
              Limpar histórico
            </button>
          ) : null}
        </div>
        <HistoryList entries={entries} onReuse={handleReuse} />
      </section>

      <ClearHistoryDialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        onConfirm={clearAll}
      />
    </div>
  )
}

export default App
