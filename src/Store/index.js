import { createStore,applyMiddleware } from 'redux'
import {rootReducer} from '../Reducer/index.js'

export default function configureStore(initialState) {
  return createStore(rootReducer);
}
