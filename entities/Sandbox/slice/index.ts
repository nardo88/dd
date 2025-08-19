import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { SandboxListState } from '../types'

const initialState: SandboxListState = {
  currentPage: 1,
  data: [],
  filter: '',
  isLoading: false,
  total: 0,
}

const sandboxListSlice = createSlice({
  name: 'sandboxList',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload
    },
  },
})

export const { actions: sandboxListAction } = sandboxListSlice
export const { reducer: sandboxListReducer } = sandboxListSlice
