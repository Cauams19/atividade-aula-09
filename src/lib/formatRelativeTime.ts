const MINUTE_MS = 60_000
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS

export function formatRelativeTime(
  isoDate: string,
  now: Date = new Date(),
): string {
  const date = new Date(isoDate)
  const diffMs = now.getTime() - date.getTime()

  if (Number.isNaN(diffMs) || diffMs < 0) {
    return date.toLocaleDateString('pt-BR')
  }

  const diffMin = Math.floor(diffMs / MINUTE_MS)
  const diffHour = Math.floor(diffMs / HOUR_MS)
  const diffDay = Math.floor(diffMs / DAY_MS)

  if (diffMs < MINUTE_MS) {
    return 'agora mesmo'
  }
  if (diffMin < 60) {
    return diffMin === 1 ? 'há 1 min' : `há ${diffMin} min`
  }
  if (diffHour < 24) {
    return diffHour === 1 ? 'há 1 h' : `há ${diffHour} h`
  }
  if (diffDay === 1) {
    return 'ontem'
  }
  if (diffDay < 7) {
    return `há ${diffDay} dias`
  }

  return date.toLocaleDateString('pt-BR')
}
