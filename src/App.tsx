function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
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

      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-center text-slate-600 dark:text-slate-400">
          Gerador de Conventional Commits — em construção (Story 1.2+).
        </p>
      </main>

      <section
        id="historico"
        className="mx-auto max-w-3xl border-t border-slate-200 px-4 py-8 dark:border-slate-700"
        aria-label="Histórico de commits"
      >
        <h2 className="mb-4 text-lg font-semibold">Histórico</h2>
        <p className="text-sm text-slate-500">Nenhum commit gerado ainda.</p>
      </section>
    </div>
  )
}

export default App
