import { COMMIT_TYPES, type CommitFormInput, type CommitType } from '@/types/commit'

const TYPE_LABELS: Record<CommitType, string> = {
  feat: 'feat — nova funcionalidade',
  fix: 'fix — correção de bug',
  docs: 'docs — documentação',
  style: 'style — formatação (sem mudança de lógica)',
  refactor: 'refactor — refatoração',
  perf: 'perf — performance',
  test: 'test — testes',
  build: 'build — build ou dependências',
  ci: 'ci — integração contínua',
  chore: 'chore — tarefas gerais',
  revert: 'revert — reverter commit',
}

export interface CommitFormProps {
  value: CommitFormInput
  errors: Partial<Record<'type' | 'scope' | 'description', string>>
  onTypeChange: (type: CommitType) => void
  onScopeChange: (scope: string) => void
  onDescriptionChange: (description: string) => void
}

const fieldClass =
  'min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-blue-400'

const fieldErrorClass =
  'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400'

export function CommitForm({
  value,
  errors,
  onTypeChange,
  onScopeChange,
  onDescriptionChange,
}: CommitFormProps) {
  const typeErrorId = 'commit-type-error'
  const scopeErrorId = 'commit-scope-error'
  const descriptionErrorId = 'commit-description-error'

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Formulário de mensagem de commit"
    >
      <div>
        <label htmlFor="commit-type" className="mb-1.5 block text-sm font-medium">
          Tipo <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <select
          id="commit-type"
          className={`${fieldClass} ${errors.type ? fieldErrorClass : ''}`}
          value={value.type}
          onChange={(e) => onTypeChange(e.target.value as CommitType)}
          aria-invalid={Boolean(errors.type)}
          aria-describedby={errors.type ? typeErrorId : undefined}
        >
          {COMMIT_TYPES.map((type) => (
            <option key={type} value={type}>
              {TYPE_LABELS[type]}
            </option>
          ))}
        </select>
        {errors.type ? (
          <p id={typeErrorId} role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.type}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="commit-scope" className="mb-1.5 block text-sm font-medium">
          Escopo <span className="font-normal text-slate-500">(opcional)</span>
        </label>
        <input
          id="commit-scope"
          type="text"
          className={`${fieldClass} font-mono ${errors.scope ? fieldErrorClass : ''}`}
          value={value.scope}
          onChange={(e) => onScopeChange(e.target.value)}
          placeholder="ex: auth, ui, api"
          autoComplete="off"
          aria-invalid={Boolean(errors.scope)}
          aria-describedby={errors.scope ? scopeErrorId : undefined}
        />
        {errors.scope ? (
          <p id={scopeErrorId} role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.scope}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="commit-description" className="mb-1.5 block text-sm font-medium">
          Descrição <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <input
          id="commit-description"
          type="text"
          className={`${fieldClass} ${errors.description ? fieldErrorClass : ''}`}
          value={value.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="add login form validation"
          autoComplete="off"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? descriptionErrorId : undefined}
        />
        {errors.description ? (
          <p
            id={descriptionErrorId}
            role="alert"
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {errors.description}
          </p>
        ) : null}
      </div>
    </form>
  )
}
