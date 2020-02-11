import React from 'react'
import { connect } from 'react-redux'
import { handleCommentEdit, handleCommentAdd } from '../../actions/comments'
import { useFormInput } from '../../hooks'

const CommentForm = ({ comment, callback, dispatch }) => {
  const author = useFormInput(comment.author)
  const body = useFormInput(comment.body)

  const checkIfSaveEnabled = () => (author.value && body.value)

  const handleFormSubmit = () => {
    comment.author = author.value
    comment.body = body.value
    if (comment.id) {
      dispatch(handleCommentEdit(comment, () => {
        callback(true)
      }))
    }
    else {
      dispatch(handleCommentAdd(comment, () => {
        callback(true, true)
      }))
    }
  }

  const handleFormCancel = () => {
    callback()
  }
  
  return (
    <div className='form-container'>
      <div className='form-group'>
        <label>Author</label>
        <input
          className='form-input'
          type='text'
          placeholder='Post author*'
          {...author}
        />
      </div>
      <div className='form-group'>
        <label>Body</label>
        <textarea
          className='form-input'
          type='text'
          placeholder='Post body*'
          {...body}
        />
      </div>
      <div className='form-footer'>
        <button 
          onClick={handleFormCancel}
          className='cancel'>Cancel</button>
        <button 
          onClick={handleFormSubmit}
          disabled={!checkIfSaveEnabled()}
          className={'submit' + (checkIfSaveEnabled() ? '' : ' disabled')}>Save</button>
      </div>
    </div>
  )
}

const ConnectedCommentForm = connect()(CommentForm)

export default ConnectedCommentForm
