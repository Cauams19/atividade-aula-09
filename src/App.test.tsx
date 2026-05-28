import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows empty history state initially', () => {
    render(<App />)
    expect(screen.getByTestId('history-empty')).toBeInTheDocument()
  })

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

  it('saves to history after successful copy', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const { vi } = await import('vitest')
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

    const storage = new Map<string, string>()
    const memoryStorage = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
      clear: () => storage.clear(),
      key: () => null,
      length: storage.size,
    }
    vi.stubGlobal('localStorage', memoryStorage)
    vi.stubGlobal('window', { localStorage: memoryStorage })

    render(<App />)
    await user.type(screen.getByLabelText(/Descrição/i), 'add history test')
    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    const historyList = await screen.findByTestId('history-list')
    expect(
      within(historyList).getByText(/feat: add history test/i),
    ).toBeInTheDocument()
  })

  it('reuses history entry into the form', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const { vi } = await import('vitest')
    const user = userEvent.setup()
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    const storage = new Map<string, string>()
    const memoryStorage = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
      clear: () => storage.clear(),
      key: () => null,
      length: storage.size,
    }
    vi.stubGlobal('localStorage', memoryStorage)
    vi.stubGlobal('window', { localStorage: memoryStorage, scrollTo })

    render(<App />)
    await user.selectOptions(screen.getByLabelText(/Tipo/i), 'fix')
    await user.type(screen.getByLabelText(/Escopo/i), 'api')
    await user.type(screen.getByLabelText(/Descrição/i), 'patch endpoint')
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    await user.clear(screen.getByLabelText(/Descrição/i))
    await user.click(screen.getByRole('button', { name: /Reutilizar/i }))

    expect(screen.getByLabelText(/Tipo/i)).toHaveValue('fix')
    expect(screen.getByLabelText(/Escopo/i)).toHaveValue('api')
    expect(screen.getByLabelText(/Descrição/i)).toHaveValue('patch endpoint')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('clears history after confirmation in dialog', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

    const storage = new Map<string, string>()
    const memoryStorage = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
      clear: () => storage.clear(),
      key: () => null,
      length: storage.size,
    }
    vi.stubGlobal('localStorage', memoryStorage)
    vi.stubGlobal('window', { localStorage: memoryStorage })

    render(<App />)
    await user.type(screen.getByLabelText(/Descrição/i), 'to be cleared')
    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    expect(screen.getByTestId('history-list')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Limpar histórico/i }))
    expect(screen.getByTestId('clear-history-dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Limpar tudo/i }))

    expect(screen.getByTestId('history-empty')).toBeInTheDocument()
  })
})
