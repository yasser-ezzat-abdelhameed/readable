import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { handlePostEdit, handlePostAdd } from '../../actions/posts'
import { useFormInput } from '../../hooks'

const Form = ({ post, categories, dispatch }) => {
  const title = useFormInput(post.title || "")
  const author = useFormInput(post.author)
  const body = useFormInput(post.body)
  const [category, setCategory] = useState(post.category)
  const history = useHistory()

  const handleCategorySelect = name => {
    setCategory(name)
  }

  const checkIfSaveEnabled = () => (title.value && author.value && body.value && category)

  const handleFormSubmit = () => {
    post.title = title.value
    post.author = author.value
    post.body = body.value
    post.category = category
    if (post.id) {
      dispatch(handlePostEdit(post, () => {
        history.push('/')
      }))
    }
    else {
      dispatch(handlePostAdd(post, () => {
        history.push('/')
      }))
    }
  }

  return (
    <div className='form-container'>
      <div className='form-group'>
        <label>Post title</label>
        <input
          className='form-input'
          type='text'
          placeholder='Post title*'
          {...title}
        />
      </div>
      <div className='form-group'>
        <label>Post author</label>
        <input
          className='form-input'
          type='text'
          placeholder='Post author*'
          {...author}
        />
      </div>
      <div className='form-group'>
        <label>Post body</label>
        <textarea
          className='form-input'
          type='text'
          placeholder='Post body*'
          {...body}
        />
      </div>
      <div className='form-group'>
        <label>Post category</label>
        <div className='categories-select-container'>
          {
            categories.map(c => (
              <div 
                key={c.name} 
                onClick={handleCategorySelect.bind(this, c.name)}
                className={'category-item' + (category === c.name ? ' active' : '')}>{c.name}</div>
            ))
          }
        </div>
      </div>
      <div className='form-footer'>
        <button 
          onClick={handleFormSubmit}
          disabled={!checkIfSaveEnabled()}
          className={'submit' + (checkIfSaveEnabled() ? '' : ' disabled')}>Save</button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ posts, categories }, { isNew }) => ({
  categories,
  post: isNew ? {} : (posts[0] || {})
})

const ConnectedForm = connect(mapStateToProps)(Form)

export default ConnectedForm
