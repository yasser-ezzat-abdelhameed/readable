import { getPosts, getPost, deletePost, voteForPost, editPost, addPost } from '../util/apis'

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const UPDATE_POST = "UPDATE_POST"
export const SORT_POSTS = "SORT_POSTS"
export const DELETE_POST = "DELETE_POST"

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const updatePost = post => ({
  type: UPDATE_POST,
  post
})

export const sortPosts = option => ({
  type: SORT_POSTS,
  option
})

export const removePost = postId => ({
  type: DELETE_POST,
  postId
})

export const handleReceivePosts = categoryId => async dispatch => {
  const { data, error } = await getPosts(categoryId)
  if (data) {
    dispatch(receivePosts(data))
  } else {
    // error handling
    if (error) console.log(error)
  }
}

export const handleReceivePost = (postId, errCallback) => async dispatch => {
  const { data, error } = await getPost(postId)
  if (data) {
    dispatch(receivePosts([data]))
  } else {
    // error handling
    if (error) console.log(error)
    errCallback()
  }
}

export const handlePostVote = (postId, option) => async (dispatch, getState) => {
  await voteForPost(postId, option)
  let post = [...getState().posts].find(p => p.id === postId)
  switch (option) {
    case "upVote": {
      post.voteScore += 1
      break
    }
    case "downVote": {
      post.voteScore -= 1
      break
    }
    default:
      return
  }
  dispatch(updatePost(post))
}

export const handlePostEdit = (post, callback) => async dispatch => {
  await editPost(post)
  dispatch(updatePost(post))
  callback()
}

export const handlePostAdd = (post, callback) => async dispatch => {
  await addPost(post)
  callback()
}

export const handleDeletePost = postId => async dispatch => {
  await deletePost(postId)
  dispatch(removePost(postId))
}
