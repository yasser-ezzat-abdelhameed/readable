import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { handleReceivePost } from '../../actions/posts'
import { receiveComments, handleReceiveComments } from '../../actions/comments'
import Post from '../Post'
import Comment from '../Comment'
import CommentForm from './CommentForm'
import './styles.css'

const PostDetails = ({ dispatch, post, comments }) => {
  const { postId } = useParams()
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [selectedComment, setSelectedComment] = useState({ parentId: postId })
  const history = useHistory()

  useEffect(() => {
    dispatch(handleReceivePost(postId, () => {
      history.push('/404')
    }))
    dispatch(handleReceiveComments(postId))
    return () => {
      dispatch(receiveComments([]))
    }
    // eslint-disable-next-line
  }, [])

  const handleAddCommentClick = () => {
    setSelectedComment({ parentId: postId })
    setShowCommentForm(true)
  }

  const selectCommentForEdit = comment => {
    setSelectedComment(comment)
    setShowCommentForm(true)
  }

  const commentsFormCallback = (shouldRefreshComments, shouldRefreshPost) => {
    if (shouldRefreshComments) {
      dispatch(handleReceiveComments(postId))
    }
    if (shouldRefreshPost) {
      dispatch(handleReceivePost(postId))
    }
    setShowCommentForm(false)
  }

  if (post.id !== postId) return <p>Loading...</p>

  return (
    <div className='post-details-component'>
      <div className='left-section'>
        <Link className='back-btn' to='/'>
          <span>
            <i className='fa fa-arrow-left' />
          </span>
          <span>Back</span>
        </Link>
      </div>
      <div className='right-section'>
        <Post {...post} viewLink={false} wrappedBody={false} />
        {
          showCommentForm ? (
            <CommentForm comment={selectedComment} callback={commentsFormCallback} />
          ) : (
            <React.Fragment>
              <div className='add-comment-btn-container'>
                <button className='submit' onClick={handleAddCommentClick}>Add a comment</button>
              </div>
              {
                comments.map(comment => (
                  <Comment key={comment.id} comment={comment} selectCommentForEdit={selectCommentForEdit} />
                ))
              }
            </React.Fragment>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ posts, comments }) => ({
  post: posts[0] || {},
  comments
})

const ConnectedPostDetails = connect(mapStateToProps)(PostDetails)

export default ConnectedPostDetails
