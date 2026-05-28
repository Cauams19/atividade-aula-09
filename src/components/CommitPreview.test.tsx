import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CommitPreview } from './CommitPreview'

describe('CommitPreview', () => {
  it('renders formatted message', () => {
    render(
      <CommitPreview
        message="feat(auth): add login"
        warnings={[]}
      />,
    )
    expect(screen.getByTestId('commit-preview-message')).toHaveTextContent(
      'feat(auth): add login',
    )
  })

  it('has accessible preview label', () => {
    render(<CommitPreview message="feat: test" warnings={[]} />)
    expect(
      screen.getByLabelText('Preview da mensagem de commit'),
    ).toBeInTheDocument()
  })

  it('shows convention warnings', () => {
    render(
      <CommitPreview
        message="feat: Add test."
        warnings={[
          'Descrição deve começar em minúsculas.',
          'Descrição não deve terminar com ponto final.',
        ]}
      />,
    )
    const warnings = screen.getByTestId('commit-preview-warnings')
    expect(warnings).toBeInTheDocument()
    expect(warnings.children).toHaveLength(2)
  })

  it('shows placeholder when message is empty', () => {
    render(<CommitPreview message="" warnings={[]} />)
    expect(screen.getByText(/Preencha os campos/i)).toBeInTheDocument()
  })
})
