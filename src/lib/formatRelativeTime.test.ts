import { describe, expect, it } from 'vitest'
import { formatRelativeTime } from './formatRelativeTime'

describe('formatRelativeTime', () => {
  const now = new Date('2026-05-27T12:00:00.000Z')

  it('returns "agora mesmo" for recent timestamps', () => {
    expect(
      formatRelativeTime('2026-05-27T11:59:30.000Z', now),
    ).toBe('agora mesmo')
  })

  it('returns minutes ago', () => {
    expect(formatRelativeTime('2026-05-27T11:58:00.000Z', now)).toBe('há 2 min')
  })

  it('returns "ontem" for one day ago', () => {
    expect(formatRelativeTime('2026-05-26T12:00:00.000Z', now)).toBe('ontem')
  })
})
