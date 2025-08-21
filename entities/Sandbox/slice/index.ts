import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getSandboxList } from '../thunks/getSandboxList'
import { SandboxListState } from '../types'

const initialState: SandboxListState = {
  currentPage: 1,
  data: [],
  filter: '',
  isLoading: false,
  total: 0,
  error: null,
}

const sandboxListSlice = createSlice({
  name: 'sandboxList',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSandboxList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSandboxList.fulfilled, (state, action) => {
        state.total = action.payload.total
        state.data = action.payload.data
        state.isLoading = false
      })
      .addCase(getSandboxList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions: sandboxListAction } = sandboxListSlice
export const { reducer: sandboxListReducer } = sandboxListSlice
