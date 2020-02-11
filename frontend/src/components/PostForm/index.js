import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { handleReceivePost } from '../../actions/posts'
import Form from './Form'
import './styles.css'

const Post = ({ dispatch }) => {
  const { postId } = useParams()
  const [loaded, setLoaded] = useState(false)
  const history = useHistory()

  useEffect(() => {
    setupPost()
    // eslint-disable-next-line
  }, [])
  
  const setupPost = async () => {
    if (postId) {
      await dispatch(handleReceivePost(postId, () => {
        history.push('/404')
      }))
    }
    setLoaded(true)
  }

  return (
    <div className='post-form-component'>
      <div className='left-section'>
        <Link className='back-btn' to='/'>
          <span>
            <i className='fa fa-arrow-left' />
          </span>
          <span>
            Back
          </span>
        </Link>
      </div>
      {
        loaded ? (
          <Form isNew={!postId} />
        ) : <p>Loading...</p>
      }
    </div>
  )
}

const ConnectedPost = connect()(Post)

export default ConnectedPost
