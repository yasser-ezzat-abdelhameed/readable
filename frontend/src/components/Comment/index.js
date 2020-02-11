import React from 'react'
import { connect } from 'react-redux'
import { handleCommentVote, handleDeleteComment } from '../../actions/comments'
import formatDate from '../../util/formatDate'
import './styles.css'

const Comment = ({ comment, selectCommentForEdit, dispatch }) => {

  const handleVote = option => {
    dispatch(handleCommentVote(comment.id, option))
  }

  const handleDelete = () => {
    dispatch(handleDeleteComment(comment.id))
  }

  const handleEditClick = () => {
    selectCommentForEdit(comment)
  }

  return (
    <div className='comment-component'>
      <div>{comment.body}</div>
      <div className='comment-footer'>
        <div className='footer-data'>
          <div className='comment-author'>{comment.author}</div>
          <div className='comment-timestamp'>{formatDate(comment.timestamp)}</div>
        </div>
        <div className='footer-controls'>
          <span><i className='fa fa-edit' onClick={handleEditClick} /></span>
          <span><i className='fa fa-trash' onClick={handleDelete} /></span>
          <span><i className='fa fa-thumbs-up' onClick={handleVote.bind(this, 'upVote')} /></span>
          <span><i className='fa fa-thumbs-down' onClick={handleVote.bind(this, 'downVote')} /></span>
          <span>{comment.voteScore}</span>
        </div>
      </div>
    </div>
  )
}

const ConnectedComment = connect()(Comment)

export default ConnectedComment
