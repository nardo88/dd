import { NotificationSchema } from '@entities/Notifications'
import { SandboxListState } from '@entities/Sandbox'
import { SessionSchema } from '@entities/User'
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit'

import { ArticleEditorState } from '@features/ArticleEditor'
import { ArticleManagerState } from '@features/ArticleManager'
import { ArticleState } from '@features/ArticleViewer'
import { CatalogState } from '@features/Catalog'
import { LoginInitialState } from '@features/Login'
import { SandboxWebState } from '@features/SandboxWeb'
import { SidebarState } from '@features/Sidebar'
import { SignupInitialState } from '@features/Signup'

import store from '../Store'

// тип store
export type RootState = ReturnType<typeof store.getState>
// тип dispatch
export type AppDispatch = typeof store.dispatch

// ручками описываем тип нашего состояния.
// динамические редьюсеры указываем как не обязательные
export interface StateSchema {
  session: SessionSchema
  notification: NotificationSchema

  // async
  login?: LoginInitialState
  signup?: SignupInitialState
  catalog?: CatalogState
  articleEditor?: ArticleEditorState
  articleManager?: ArticleManagerState
  sidebar?: SidebarState
  article?: ArticleState
  sandboxList?: SandboxListState
  sandboxWeb?: SandboxWebState
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
