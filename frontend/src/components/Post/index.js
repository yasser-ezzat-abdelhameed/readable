import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handlePostVote, handleDeletePost } from '../../actions/posts'
import formatDate from '../../util/formatDate'
import './styles.css'

const Post = props => {
  const handleVote = option => {
    props.dispatch(handlePostVote(props.id, option))
  }

  const handleDelete = () => {
    props.dispatch(handleDeletePost(props.id))
  }

  return (
    <div className='post-item-component'>
      <div className='post-category'>{props.category}</div>
      <div className='post-title'>{props.title}</div>
      <div className={'post-body' + (props.wrappedBody ? ' wrapped' : '')}>{props.body}</div>
      <div className='post-footer'>
        <div className='footer-data'>
          <div className='post-author'>{props.author}</div>
          <div className='post-timestamp'>{formatDate(props.timestamp)}</div>
        </div>
        <div className='footer-controls'>
          {
            props.viewLink ? (
              <span>
                <Link to={`/${props.category}/${props.id}`}>
                  <i className='fa fa-eye' />
                </Link>
              </span>
            ) : null
          }
          <span>
            <Link to={`/${props.category}/${props.id}/edit`}>
              <i className='fa fa-edit' />
            </Link>
          </span>
          <span><i className='fa fa-trash' onClick={handleDelete} /></span>
          <span><i className='fa fa-thumbs-up' onClick={handleVote.bind(this, 'upVote')} /></span>
          <span><i className='fa fa-thumbs-down' onClick={handleVote.bind(this, 'downVote')} /></span>
          <span>{props.voteScore}</span>
          <span>
            <i className='fa fa-comments' />
            <span>{props.commentCount}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

const ConnectedPost = connect()(Post)

export default ConnectedPost
