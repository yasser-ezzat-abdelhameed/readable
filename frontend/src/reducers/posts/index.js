import { RECEIVE_POSTS, UPDATE_POST, SORT_POSTS, DELETE_POST } from '../../actions/posts'

const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS: {
      return action.posts
    }
    case UPDATE_POST: {
      let posts = [...state]
      for (let i=0; i<posts.length; i++) {
        if (posts[i].id === action.post.id) {
          posts[i] = { ...action.post }
          break
        }
      }
      return posts
    }
    case SORT_POSTS: {
      let posts = [...state]
      const { type, val } = action.option
      return posts.sort((a, b) => val * (a[type] > b[type] ? -1 : 1))
    }
    case DELETE_POST: {
      return state.filter(post => post.id !== action.postId)
    }
    default:
      return state
  }
}

export default posts
