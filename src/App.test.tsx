import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders app title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /CommitGen/i })).toBeInTheDocument()
  })

  it('renders placeholder message', () => {
    render(<App />)
    expect(screen.getByText(/em construção/i)).toBeInTheDocument()
  })
})
