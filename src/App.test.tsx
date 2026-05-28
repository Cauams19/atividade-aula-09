import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders app title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /CommitGen/i })).toBeInTheDocument()
  })

  it('renders commit form', () => {
    render(<App />)
    expect(screen.getByLabelText(/Tipo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Escopo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
  })

  it('shows validation error for short description', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    render(<App />)
    const description = screen.getByLabelText(/Descrição/i)

    await user.type(description, 'ab')
    expect(await screen.findByRole('alert')).toHaveTextContent(/Mínimo 3/)
  })

  it('updates preview as user types', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    render(<App />)
    await user.type(screen.getByLabelText(/Descrição/i), 'add login form')

    expect(screen.getByTestId('commit-preview-message')).toHaveTextContent(
      'feat: add login form',
    )
  })

  it('shows convention warnings in preview', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    render(<App />)
    await user.type(screen.getByLabelText(/Descrição/i), 'Add test.')

    expect(screen.getByTestId('commit-preview-warnings')).toBeInTheDocument()
    expect(screen.getByText(/minúsculas/i)).toBeInTheDocument()
    expect(screen.getByText(/ponto final/i)).toBeInTheDocument()
  })

  it('disables copy button when form is invalid', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /Copiar mensagem/i })).toBeDisabled()
  })

  it('copies commit message when form is valid', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const { vi } = await import('vitest')
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeText)

    render(<App />)
    await user.type(screen.getByLabelText(/Descrição/i), 'add login form')

    const copyBtn = screen.getByRole('button', { name: /Copiar mensagem/i })
    expect(copyBtn).toBeEnabled()
    await user.click(copyBtn)

    expect(writeText).toHaveBeenCalledWith('feat: add login form')
    expect(await screen.findByTestId('copy-feedback')).toHaveTextContent(/copiada/i)
  })
})
