import { render, screen } from '@testing-library/react'
import { stripe } from '../../services/stripe'
import { mocked } from 'ts-jest/utils'
import Home, { getStaticProps } from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})
jest.mock('../../services/stripe')

const renderHome = () => {
  render(
    <Home
      product={{ priceId: 'fake', amount: 'R$10,00' }}
    />
  )
}

describe('Home page', () => {
  it('should render correctly', () => {
    renderHome()
    expect(screen.getByText('for R$10,00 monthly')).toBeInTheDocument()
  })

  it('should load inital data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake_id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake_id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})