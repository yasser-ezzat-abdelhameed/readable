import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { getCategories } from '../util/apis'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const handleReceiveCategories = () => async dispatch => {
  dispatch(showLoading())
  const { data, error } = await getCategories()
  if (data) {
    dispatch(receiveCategories(data))
  } else {
    // error handling
    if (error) console.log(error)
  }
  dispatch(hideLoading())
}
