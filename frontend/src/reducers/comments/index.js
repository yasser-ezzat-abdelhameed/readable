import { RECEIVE_COMMENTS, UPDATE_COMMENT, REMOVE_COMMENT } from "../../actions/comments"

const comments = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS: {
      return action.comments
    }
    case UPDATE_COMMENT: {
      let comments = [...state]
      for (let i=0; i<comments.length; i++) {
        if (comments[i].id === action.comment.id) {
          comments[i] = { ...action.comment }
          break
        }
      }
      return comments
    }
    case REMOVE_COMMENT: {
      return state.filter(comment => comment.id !== action.commentId)
    }
    default:
      return state
  }
}

export default comments
