import { createStore } from 'redux'
import reducers from '../reducers'
import middleware from '../middleware'

const createTestStore = () => createStore(reducers, middleware)

export default createTestStore
