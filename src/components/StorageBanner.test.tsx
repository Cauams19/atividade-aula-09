import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StorageBanner } from './StorageBanner'

describe('StorageBanner', () => {
  it('renders warning when storage is unavailable', () => {
    render(<StorageBanner />)
    expect(screen.getByTestId('storage-banner')).toHaveTextContent(
      /histórico local não está disponível/i,
    )
  })
})
