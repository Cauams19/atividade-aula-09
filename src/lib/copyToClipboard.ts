export class ClipboardError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ClipboardError'
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  if (!text) {
    throw new ClipboardError('Nada para copiar.')
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Fall through to legacy copy
    }
  }

  if (typeof document === 'undefined') {
    throw new ClipboardError('Clipboard não disponível neste ambiente.')
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    const ok = document.execCommand('copy')
    if (!ok) {
      throw new ClipboardError(
        'Não foi possível copiar. Selecione o texto do preview e copie manualmente (Ctrl+C).',
      )
    }
  } finally {
    document.body.removeChild(textarea)
  }
}
