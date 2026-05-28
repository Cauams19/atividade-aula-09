import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { HistoryList } from './HistoryList'
import type { HistoryEntry } from '@/types/commit'

const sampleEntry: HistoryEntry = {
  id: 'entry-1',
  createdAt: new Date().toISOString(),
  type: 'feat',
  scope: 'ui',
  description: 'add button',
  message: 'feat(ui): add button',
}

describe('HistoryList', () => {
  it('renders empty state when there are no entries', () => {
    render(<HistoryList entries={[]} onReuse={vi.fn()} />)

    expect(screen.getByTestId('history-empty')).toBeInTheDocument()
    expect(screen.getByText(/Nenhum commit gerado ainda/i)).toBeInTheDocument()
  })

  it('renders history items sorted by newest first', () => {
    const older: HistoryEntry = {
      ...sampleEntry,
      id: 'older',
      createdAt: '2026-05-27T10:00:00.000Z',
      message: 'fix: older',
    }
    const newer: HistoryEntry = {
      ...sampleEntry,
      id: 'newer',
      createdAt: '2026-05-27T12:00:00.000Z',
      message: 'feat: newer',
    }

    render(<HistoryList entries={[older, newer]} onReuse={vi.fn()} />)

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent('feat: newer')
    expect(items[1]).toHaveTextContent('fix: older')
  })

  it('calls onReuse when Reutilizar is clicked', async () => {
    const user = userEvent.setup()
    const onReuse = vi.fn()

    render(<HistoryList entries={[sampleEntry]} onReuse={onReuse} />)
    await user.click(screen.getByRole('button', { name: /Reutilizar/i }))

    expect(onReuse).toHaveBeenCalledWith(sampleEntry)
  })
})
