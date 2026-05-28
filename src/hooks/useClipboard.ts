import { useCallback, useEffect, useRef, useState } from 'react'
import { ClipboardError, copyToClipboard } from '@/lib/copyToClipboard'

export type ClipboardStatus = 'idle' | 'success' | 'error'

const SUCCESS_RESET_MS = 2000

export function useClipboard() {
  const [status, setStatus] = useState<ClipboardStatus>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }, [])

  useEffect(() => clearResetTimer, [clearResetTimer])

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      clearResetTimer()
      setStatus('idle')
      setFeedbackMessage('')

      try {
        await copyToClipboard(text)
        setStatus('success')
        setFeedbackMessage('Mensagem copiada para a área de transferência.')
        resetTimerRef.current = setTimeout(() => {
          setStatus('idle')
          setFeedbackMessage('')
        }, SUCCESS_RESET_MS)
        return true
      } catch (error) {
        setStatus('error')
        setFeedbackMessage(
          error instanceof ClipboardError
            ? error.message
            : 'Falha ao copiar. Tente selecionar o preview manualmente.',
        )
        return false
      }
    },
    [clearResetTimer],
  )

  return { status, feedbackMessage, copy }
}
