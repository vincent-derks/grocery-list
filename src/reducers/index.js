import { combineReducers } from 'redux'
import appReducer from './app'
import contentReducer from './content'
import shareReducer from './share'

const rootReducer = combineReducers({
    appReducer,
    contentReducer,
    shareReducer
})

export default rootReducer
