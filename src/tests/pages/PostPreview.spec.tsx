import { render, screen } from '@testing-library/react'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'
import Post, { getStaticPaths } from '../../pages/posts/preview/[slug]'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const post = 
  { slug: 'my-new-post', title: 'my-new-post', content: 'uu', updatedAt: 'March, 22' }

jest.mock('next-auth/client')
jest.mock('next/router')

const renderPost = () => {
  render(
    <Post
      post={post}
    />
  )
}

describe('Post Preview page', () => {
  it('should render correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    renderPost()
    expect(screen.getByText('my-new-post')).toBeInTheDocument()
    expect(screen.getByText('uu')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })
})