//redux
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) //empêcher les gens d'avoir accès à votre store
)

// store.dispatch(getComments())

export default store
