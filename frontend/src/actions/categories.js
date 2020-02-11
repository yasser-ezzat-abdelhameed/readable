import { getCategories } from '../util/apis'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const handleReceiveCategories = () => async dispatch => {
  const { data, error } = await getCategories()
  if (data) {
    dispatch(receiveCategories(data))
  } else {
    // error handling
    if (error) console.log(error)
  }
}
