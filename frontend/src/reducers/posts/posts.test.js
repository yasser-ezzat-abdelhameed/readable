import postsReducer from './index'
import { receivePosts, updatePost, sortPosts, removePost } from '../../actions/posts'

const posts = [
  {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
]

describe('posts reducer', () => {
  it('Should return the default state', () => {
    const state = postsReducer(undefined, {})
    expect(state).toEqual([])
  })

  it('Should return the correct new state when passing in posts', () => {
    const state = postsReducer(undefined, receivePosts(posts))
    expect(state).toEqual(posts)
  })

  it('Should update the post correctly', () => {
    let post = {...posts[0]}
    post.title = "New Title"
    const state = postsReducer(posts, updatePost(post))
    expect(state[0].title).toBe("New Title")
  })

  it('Should sort posts correctly', () => {
    const state = postsReducer(posts, sortPosts({ val: -1, type: "voteScore" }))
    expect(state[0]).toBe(posts[1])
  })

  it('Should delete post correctly', () => {
    const state = postsReducer(posts, removePost(posts[0].id))
    expect(state.length).toBe(posts.length-1)
  })
})
