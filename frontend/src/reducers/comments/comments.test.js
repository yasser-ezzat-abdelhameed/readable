import commentsReducer from './index'
import { receiveComments, updateComment, removeComment } from '../../actions/comments'

const comments = [
  {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
]

describe('comments reducer', () => {
  it('Should return the default state', () => {
    const state = commentsReducer(undefined, {})
    expect(state).toEqual([])
  })

  it('Should return the correct new state when passing in comments', () => {
    const state = commentsReducer(undefined, receiveComments(comments))
    expect(state).toEqual(comments)
  })

  it('Should update the comment correctly', () => {
    let comment = {...comments[0]}
    const newBody = "New Body"
    comment.body = newBody
    const state = commentsReducer(comments, updateComment(comment))
    expect(state[0].body).toBe(newBody)
  })

  it('Should delete comment correctly', () => {
    const state = commentsReducer(comments, removeComment(comments[0].id))
    expect(state.length).toBe(comments.length-1)
  })
})
