import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { defaultFilter } from '../consts'
import { SandboxState, StackType } from '../types'

const initialState: SandboxState = {
  currentPage: 1,
  data: [],
  filters: defaultFilter,
  isLoading: false,
  total: 0,
}

const sandboxSlice = createSlice({
  name: 'sandbox',
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

export const { actions: sandboxAction } = sandboxSlice
export const { reducer: sandboxReducer } = sandboxSlice
