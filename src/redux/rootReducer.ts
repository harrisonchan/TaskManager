import { combineReducers } from '@reduxjs/toolkit'
import { counterReducer, taskReducer } from './features'

export const rootReducer = combineReducers({
  counter: counterReducer,
  task: taskReducer,
})

export type RootState = ReturnType<typeof rootReducer>
