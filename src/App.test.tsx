import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders app title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /CommitGen/i })).toBeInTheDocument()
  })

  it('renders commit form', () => {
    render(<App />)
    expect(screen.getByLabelText(/Tipo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Escopo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
  })

  it('shows validation error for short description', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    render(<App />)
    const description = screen.getByLabelText(/Descrição/i)

    await user.type(description, 'ab')
    expect(await screen.findByRole('alert')).toHaveTextContent(/Mínimo 3/)
  })
})
