import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/router')

const renderSubscribeButton = () => {
  render(
    <SubscribeButton />
  )
}

describe('SubscribeButton component', () => {
  it('should render correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    renderSubscribeButton()
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('should redirect to sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession)
    const signInMocked = mocked(signIn)

    useSessionMocked.mockReturnValueOnce([null, false])
    renderSubscribeButton()

    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('should redirect to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMocked = jest.fn()

    useRouterMocked.mockReturnValueOnce({ push: pushMocked } as any)
    useSessionMocked.mockReturnValue([
      { 
        user: {
          name: 'John Doe',
          email: 'jj@dd.com',
        },
        activeSubscription: 'fake-subscription',
        expires: 'mock'
      },
      false
    ] as any)

    renderSubscribeButton()

    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalledWith('/posts')
  })
})