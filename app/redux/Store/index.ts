import { sessionReducer } from '@entities/User'
import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit'
import { createReducerManager } from '../servises'
import { StateSchema } from '../types'

const rootReducer: ReducersMapObject<StateSchema> = {
  session: sessionReducer,
}

const reducerManager = createReducerManager(rootReducer)
const store = configureStore({
  reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
  devTools: true,
})

// @ts-ignore
store.reducerManager = reducerManager

export default store
