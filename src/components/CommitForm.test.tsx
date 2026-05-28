import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CommitForm } from './CommitForm'
import { DEFAULT_COMMIT_FORM } from '@/types/commit'

describe('CommitForm', () => {
  it('renders all form fields with labels', () => {
    render(
      <CommitForm
        value={DEFAULT_COMMIT_FORM}
        errors={{}}
        onTypeChange={vi.fn()}
        onScopeChange={vi.fn()}
        onDescriptionChange={vi.fn()}
      />,
    )

    expect(screen.getByLabelText(/Tipo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Escopo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
  })

  it('lists all conventional commit types', () => {
    render(
      <CommitForm
        value={DEFAULT_COMMIT_FORM}
        errors={{}}
        onTypeChange={vi.fn()}
        onScopeChange={vi.fn()}
        onDescriptionChange={vi.fn()}
      />,
    )

    const select = screen.getByLabelText(/Tipo/i) as HTMLSelectElement
    expect(select.options).toHaveLength(11)
    expect(select.options[0].value).toBe('feat')
    expect(select.options[10].value).toBe('revert')
  })

  it('shows accessible error messages', () => {
    render(
      <CommitForm
        value={{ ...DEFAULT_COMMIT_FORM, description: 'ab' }}
        errors={{ description: 'Mínimo 3 caracteres.' }}
        onTypeChange={vi.fn()}
        onScopeChange={vi.fn()}
        onDescriptionChange={vi.fn()}
      />,
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Mínimo 3 caracteres.')
    expect(screen.getByLabelText(/Descrição/i)).toHaveAttribute('aria-invalid', 'true')
  })

  it('calls change handlers on input', async () => {
    const user = userEvent.setup()
    const onDescriptionChange = vi.fn()

    render(
      <CommitForm
        value={DEFAULT_COMMIT_FORM}
        errors={{}}
        onTypeChange={vi.fn()}
        onScopeChange={vi.fn()}
        onDescriptionChange={onDescriptionChange}
      />,
    )

    await user.type(screen.getByLabelText(/Descrição/i), 'add tests')
    expect(onDescriptionChange).toHaveBeenCalled()
  })
})
