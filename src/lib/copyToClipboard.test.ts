import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ClipboardError, copyToClipboard } from './copyToClipboard'

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('uses navigator.clipboard.writeText when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    await copyToClipboard('feat: add tests')

    expect(writeText).toHaveBeenCalledWith('feat: add tests')
  })

  it('falls back to execCommand when clipboard API fails', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'))
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    const execCommand = vi.fn().mockReturnValue(true)
    vi.stubGlobal('document', {
      createElement: () => ({
        value: '',
        style: {},
        setAttribute: vi.fn(),
        select: vi.fn(),
      }),
      body: {
        appendChild: vi.fn(),
        removeChild: vi.fn(),
      },
      execCommand,
    })

    await copyToClipboard('feat: fallback')

    expect(execCommand).toHaveBeenCalledWith('copy')
  })

  it('throws when text is empty', async () => {
    await expect(copyToClipboard('')).rejects.toBeInstanceOf(ClipboardError)
  })
})
