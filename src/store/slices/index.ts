import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from './authentication'

const rootReducer = combineReducers({
    authentication: loginReducer,
})

export default rootReducer
