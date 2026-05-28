import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ClearHistoryDialog } from './ClearHistoryDialog'

describe('ClearHistoryDialog', () => {
  it('renders confirmation content when open', () => {
    render(
      <ClearHistoryDialog open onClose={vi.fn()} onConfirm={vi.fn()} />,
    )

    expect(screen.getByTestId('clear-history-dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Limpar histórico/i })).toBeInTheDocument()
    expect(screen.getByText(/Não pode desfazer/i)).toBeInTheDocument()
  })

  it('calls onConfirm when Limpar tudo is clicked', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    const onClose = vi.fn()

    render(
      <ClearHistoryDialog open onClose={onClose} onConfirm={onConfirm} />,
    )

    await user.click(screen.getByRole('button', { name: /Limpar tudo/i }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Cancelar is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <ClearHistoryDialog open onClose={onClose} onConfirm={vi.fn()} />,
    )

    await user.click(screen.getByRole('button', { name: /Cancelar/i }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
