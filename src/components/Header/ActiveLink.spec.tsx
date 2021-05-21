import { render } from '@testing-library/react'
import { ActiveLink } from './ActiveLink'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return { asPath: '/' }
    }
  }
})

const renderActiveLink = () => {
  const { getByText } = render(
    <ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
  )

  return getByText
}

describe('ActiveLink component', () => {
  it('should render active link correctly', () => {
    const getByText = renderActiveLink()
  
    expect(getByText('Home')).toBeInTheDocument()
  })
  
  it('should receive active class when active', () => {
    const getByText = renderActiveLink()
  
    expect(getByText('Home')).toHaveClass('active')
  })
})

