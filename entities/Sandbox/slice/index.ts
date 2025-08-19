import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { defaultFilter } from '../consts'
import { SandboxListState, StackType } from '../types'

const initialState: SandboxListState = {
  currentPage: 1,
  data: [],
  filters: defaultFilter,
  isLoading: false,
  total: 0,
}

const sandboxListSlice = createSlice({
  name: 'sandboxList',
  initialState,
  reducers: {
    changeTitleFilter(state, action: PayloadAction<string>) {
      state.filters.title = action.payload
    },
    changeStackFilter(state, action: PayloadAction<StackType>) {
      state.filters.type = action.payload
    },
  },
})

export const { actions: sandboxListAction } = sandboxListSlice
export const { reducer: sandboxListReducer } = sandboxListSlice
