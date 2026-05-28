import { CommitForm } from '@/components/CommitForm'
import { CommitPreview } from '@/components/CommitPreview'
import { CopyButton } from '@/components/CopyButton'
import { StorageBanner } from '@/components/StorageBanner'
import { useCommitForm } from '@/hooks/useCommitForm'
import { useHistory } from '@/hooks/useHistory'

function App() {
  const { input, errors, preview, valid, setType, setScope, setDescription } =
    useCommitForm()
  const { entries, storageAvailable, appendFromCopy } = useHistory()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-xl font-semibold">
            <span className="text-blue-600 dark:text-blue-400">◆</span> CommitGen
          </h1>
          <a
            href="#historico"
            className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400"
          >
            Histórico
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
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
        <h2 className="mb-4 text-lg font-semibold">Histórico</h2>
        {entries.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nenhum commit gerado ainda.
          </p>
        ) : (
          <p
            className="text-sm text-slate-600 dark:text-slate-400"
            data-testid="history-count"
          >
            {entries.length}{' '}
            {entries.length === 1 ? 'mensagem salva' : 'mensagens salvas'}{' '}
            localmente.
          </p>
        )}
      </section>
    </div>
  )
}

export default App
