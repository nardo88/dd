import { sessionReducer } from '@entities/User'
import { CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { createReducerManager } from '../services'
import { StateSchema } from '../types'
import { notificationReducer } from '@entities/Notifications'

const rootReducer: ReducersMapObject<StateSchema> = {
  session: sessionReducer,
  notification: notificationReducer,
}

const reducerManager = createReducerManager(rootReducer)

const store = configureStore({
  reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// @ts-ignore
store.reducerManager = reducerManager

export default store
