import categoriesReducer from './index'
import { receiveCategories } from '../../actions/categories'

describe('categories reducer', () => {
  it("Should return the default state", () => {
    const state = categoriesReducer(undefined, {})
    expect(state).toEqual([])
  })

  it("Should return the correct new state when passing in posts", () => {
    const categories = [
      {
        path: "path1",
        name: "name1"
      },
      {
        path: "path2",
        name: "name2"
      },
    ]
    const state = categoriesReducer(undefined, receiveCategories(categories))
    expect(state).toEqual(categories)
  })
})
