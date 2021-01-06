import {userReducer,modalInterface} from './reducers'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    user: userReducer,
    post: modalInterface
})

export default allReducers