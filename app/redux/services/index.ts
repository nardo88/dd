import { AnyAction, Reducer, ReducersMapObject, combineReducers } from '@reduxjs/toolkit'

import { ReducerManager, StateSchema, StateSchemaKey } from '../types'

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers }
  let combinedReducer = combineReducers(reducers)
  let keysToRemove: StateSchemaKey[] = []
  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema | undefined, action: AnyAction) => {
      let newState = state

      if (keysToRemove.length > 0 && state) {
        newState = { ...state }
        keysToRemove.forEach((key) => {
          if (newState?.[key]) {
            delete newState[key]
          }
        })
        keysToRemove = []
      }

      return combinedReducer(newState, action)
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return
      }
      reducers[key] = reducer
      combinedReducer = combineReducers(reducers)
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return
      }
      delete reducers[key]
      keysToRemove.push(key)
      combinedReducer = combineReducers(reducers)
    },
  }
}
