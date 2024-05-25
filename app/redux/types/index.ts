import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit'
import store from '../Store'
import { SessionSchema } from '@entities/User'
import { LoginInitialState } from '@features/Login'
import { SignupInitialState } from '@features/Signup'
import { CatalogState } from '@features/Catalog'

// тип store
export type RootState = ReturnType<typeof store.getState>
// тип dispatch
export type AppDispatch = typeof store.dispatch

// ручками описываем тип нашего состояния.
// динамические редьюсеры указываем как не обязательные
export interface StateSchema {
  session: SessionSchema

  // async
  login?: LoginInitialState
  signup?: SignupInitialState
  catalog?: CatalogState
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}
