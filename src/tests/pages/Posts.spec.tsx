import { render, screen } from '@testing-library/react'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'
import Posts, { getStaticProps } from '../../pages/posts'

const postsArray = [
  { slug: 'my-new-post', title: 'my-new-post', excerpt: 'uu', updatedAt: 'March, 22' },
  { slug: 'my-new-post2', title: 'my-new-post2', excerpt: 'uuu', updatedAt: 'March, 23' },
  { slug: 'my-new-post3', title: 'my-new-post3', excerpt: 'uuuu', updatedAt: 'March, 24' },
]

jest.mock('../../services/prismic')

const renderPosts = () => {
  render(
    <Posts
      posts={postsArray}
    />
  )
}

describe('Post page', () => {
  it('should render correctly', () => {
    renderPosts()
    expect(screen.getByText('my-new-post')).toBeInTheDocument()
    expect(screen.getByText('my-new-post2')).toBeInTheDocument()
    expect(screen.getByText('my-new-post3')).toBeInTheDocument()
  })

  it('should load inital data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new Post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ],
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new Post',
              excerpt: 'Post excerpt',
              updatedAt: '01 de abril de 2021'
            }
          ]
        }
      })
    )
  })
})