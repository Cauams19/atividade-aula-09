import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ClipboardError, copyToClipboard } from '@/lib/copyToClipboard'
import { CopyButton } from './CopyButton'

vi.mock('@/lib/copyToClipboard', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/copyToClipboard')>()
  return {
    ...actual,
    copyToClipboard: vi.fn(),
  }
})

const mockCopyToClipboard = vi.mocked(copyToClipboard)

describe('CopyButton', () => {
  beforeEach(() => {
    mockCopyToClipboard.mockReset()
    mockCopyToClipboard.mockResolvedValue(undefined)
  })

  it('is disabled when disabled prop is true', () => {
    render(<CopyButton text="feat: test" disabled />)
    expect(screen.getByRole('button', { name: /Copiar mensagem/i })).toBeDisabled()
  })

  it('copies text and announces success', async () => {
    const user = userEvent.setup()

    render(<CopyButton text="feat(ui): add preview" />)

    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    expect(mockCopyToClipboard).toHaveBeenCalledWith('feat(ui): add preview')
    await waitFor(() => {
      expect(screen.getByTestId('copy-feedback')).toHaveTextContent(/copiada/i)
    })
  })

  it('calls onCopySuccess after successful copy', async () => {
    const user = userEvent.setup()
    const onCopySuccess = vi.fn()

    render(<CopyButton text="feat: ok" onCopySuccess={onCopySuccess} />)
    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    await waitFor(() => {
      expect(onCopySuccess).toHaveBeenCalledTimes(1)
    })
  })

  it('does not call onCopySuccess when copy fails', async () => {
    const user = userEvent.setup()
    const onCopySuccess = vi.fn()
    mockCopyToClipboard.mockRejectedValue(
      new ClipboardError('Não foi possível copiar.'),
    )

    render(<CopyButton text="feat: fail" onCopySuccess={onCopySuccess} />)
    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    await waitFor(() => {
      expect(screen.getByTestId('copy-feedback')).toHaveTextContent(/Não foi possível/i)
    })
    expect(onCopySuccess).not.toHaveBeenCalled()
  })

  it('announces error when clipboard fails', async () => {
    const user = userEvent.setup()
    mockCopyToClipboard.mockRejectedValue(
      new ClipboardError('Não foi possível copiar.'),
    )

    render(<CopyButton text="feat: test" />)
    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    await waitFor(() => {
      expect(screen.getByTestId('copy-feedback')).toHaveTextContent(
        /Não foi possível copiar/i,
      )
    })
  })
})
