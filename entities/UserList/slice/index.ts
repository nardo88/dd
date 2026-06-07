import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { emptyArray } from '@shared/consts/common'

import { IUserListSchema } from '../types'

const initialState: IUserListSchema = {
  error: null,
  isLoading: false,
  currentPage: 1,
  data: emptyArray,
  total: 0,
  filter: '',
}

const slice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload
    },
  },
  extraReducers(builder) {
    builder
    // Комментарий
    // .addCase(thunk.pending, (state) => {
    //   state.isLoading = true
    //   state.error = null
    // })
    // .addCase(thunk.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.institutions = action.payload
    // })
    // .addCase(thunk.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload || null
    // })
  },
})

export const { actions } = slice
export const { reducer } = slice
