import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ClipboardError, copyToClipboard } from '@/lib/copyToClipboard'
import { HistoryItem } from './HistoryItem'
import type { HistoryEntry } from '@/types/commit'

vi.mock('@/lib/copyToClipboard', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/copyToClipboard')>()
  return {
    ...actual,
    copyToClipboard: vi.fn(),
  }
})

const mockCopyToClipboard = vi.mocked(copyToClipboard)

const entry: HistoryEntry = {
  id: 'abc',
  createdAt: new Date().toISOString(),
  type: 'fix',
  scope: '',
  description: 'resolve audit',
  message: 'fix: resolve audit',
}

describe('HistoryItem', () => {
  beforeEach(() => {
    mockCopyToClipboard.mockReset()
    mockCopyToClipboard.mockResolvedValue(undefined)
  })

  it('copies message when Copiar is clicked', async () => {
    const user = userEvent.setup()

    render(<HistoryItem entry={entry} onReuse={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    expect(mockCopyToClipboard).toHaveBeenCalledWith('fix: resolve audit')
    await waitFor(() => {
      expect(screen.getByTestId(`history-copy-feedback-${entry.id}`)).toHaveTextContent(
        /copiada/i,
      )
    })
  })

  it('shows error feedback when copy fails', async () => {
    const user = userEvent.setup()
    mockCopyToClipboard.mockRejectedValue(
      new ClipboardError('Não foi possível copiar.'),
    )

    render(<HistoryItem entry={entry} onReuse={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /Copiar mensagem/i }))

    await waitFor(() => {
      expect(screen.getByTestId(`history-copy-feedback-${entry.id}`)).toHaveTextContent(
        /Não foi possível copiar/i,
      )
    })
  })
})
