import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import posts from './posts'
import categories from './categories'
import comments from './comments'

export default combineReducers({
  loadingBar: loadingBarReducer,
  posts,
  categories,
  comments
})
