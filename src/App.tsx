import { CommitForm } from '@/components/CommitForm'
import { useCommitForm } from '@/hooks/useCommitForm'

function App() {
  const { input, errors, setType, setScope, setDescription } = useCommitForm()

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
        <h2 className="mb-6 text-lg font-semibold">Nova mensagem</h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <CommitForm
            value={input}
            errors={errors}
            onTypeChange={setType}
            onScopeChange={setScope}
            onDescriptionChange={setDescription}
          />

          <aside
            className="mt-8 rounded-lg border border-dashed border-slate-300 bg-slate-100/80 p-6 text-center text-sm text-slate-500 lg:mt-0 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-400"
            aria-hidden="true"
          >
            Preview da mensagem — Story 1.3
          </aside>
        </div>
      </main>

      <section
        id="historico"
        className="mx-auto max-w-4xl border-t border-slate-200 px-4 py-8 dark:border-slate-700"
        aria-label="Histórico de commits"
      >
        <h2 className="mb-4 text-lg font-semibold">Histórico</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Nenhum commit gerado ainda.
        </p>
      </section>
    </div>
  )
}

export default App
