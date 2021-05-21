import { render, screen } from '@testing-library/react'
import { Header } from './'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return { asPath: '/' }
    }
  }
})

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

const renderHeader = () => {
  render(
    <Header />
  )
}

describe('Header component', () => {
  it('should render active link correctly', () => {
    renderHeader()
    const { getByText } = screen
  
    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Posts')).toBeInTheDocument()
  })
})

