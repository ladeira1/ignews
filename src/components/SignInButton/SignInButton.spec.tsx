import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import { SignInButton } from '.'

jest.mock('next-auth/client')

const renderSignInButton = () => {
  render(
    <SignInButton />
  )
}

describe('SignInButton component', () => {
  it('should render correctly when user is not authenticated', () => {
    const useSessionsMocked = mocked(useSession)
    useSessionsMocked.mockReturnValueOnce([null, false])

    renderSignInButton()

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('should render correctly when user is authenticated', () => {
    const useSessionsMocked = mocked(useSession)
    useSessionsMocked.mockReturnValue([
      { 
        user: {
          name: 'John Doe',
          email: 'jj@dd.com',
        },
        expires: 'mock'
      },
      false
    ])

    renderSignInButton()

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})

