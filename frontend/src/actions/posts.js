import { showLoading, hideLoading } from 'react-redux-loading-bar'
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
  dispatch(showLoading())
  const { data, error } = await getPosts(categoryId)
  if (data) {
    dispatch(receivePosts(data))
  } else {
    // error handling
    if (error) console.log(error)
  }
  dispatch(hideLoading())
}

export const handleReceivePost = (postId, errCallback) => async dispatch => {
  dispatch(showLoading())
  const { data, error } = await getPost(postId)
  if (data) {
    dispatch(receivePosts([data]))
  } else {
    // error handling
    if (error) console.log(error)
    errCallback()
  }
  dispatch(hideLoading())
}

export const handlePostVote = (postId, option) => async (dispatch, getState) => {
  dispatch(showLoading())
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
  dispatch(hideLoading())
}

export const handlePostEdit = (post, callback) => async dispatch => {
  dispatch(showLoading())
  await editPost(post)
  dispatch(updatePost(post))
  callback()
  dispatch(hideLoading())
}

export const handlePostAdd = (post, callback) => async dispatch => {
  dispatch(showLoading())
  await addPost(post)
  callback()
  dispatch(hideLoading())
}

export const handleDeletePost = postId => async dispatch => {
  dispatch(showLoading())
  await deletePost(postId)
  dispatch(removePost(postId))
  dispatch(hideLoading())
}
