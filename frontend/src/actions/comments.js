import { getComments, voteForComment, deleteComment, editComment, addComment as addCommentApi } from '../util/apis'
import { updatePost } from './posts'

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"
export const ADD_COMMENT = "ADD_COMMENT"

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
})

export const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})

export const handleReceiveComments = postId => async dispatch => {
  const { data, error } = await getComments(postId)
  if (data) {
    dispatch(receiveComments(data))
  } else {
    // error handling
    if (error) console.log(error)
  }
}

export const handleCommentVote = (commentId, option) => async (dispatch, getState) => {
  await voteForComment(commentId, option)
  let comment = [...getState().comments].find(c => c.id === commentId)
  switch (option) {
    case "upVote": {
      comment.voteScore += 1
      break
    }
    case "downVote": {
      comment.voteScore -= 1
      break
    }
    default:
      return
  }
  dispatch(updateComment(comment))
}

export const handleDeleteComment = commentId => async (dispatch, getState) => {
  const comment = getState().comments.find(c => c.id === commentId)
  let post = { ...getState().posts.find(p => p.id === comment.parentId) }
  post.commentCount -= 1
  await deleteComment(commentId)
  dispatch(removeComment(commentId))
  dispatch(updatePost(post))
}

export const handleCommentEdit = (comment, callback) => async dispatch => {
  await editComment(comment)
  dispatch(updateComment(comment))
  callback(true)
}

export const handleCommentAdd = (comment, callback) => async dispatch => {
  await addCommentApi(comment)
  callback(true, true)  
}
