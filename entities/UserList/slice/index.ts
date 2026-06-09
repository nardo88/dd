import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { emptyArray } from '@shared/consts/common'

import { getData } from '../thunks/getData'
import { toggleAdmin } from '../thunks/toggleAdmin'
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
      // Получение данных
      .addCase(getData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false
        state.total = action.payload.total
        state.data = action.payload.list
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || null
      })
      // toggle admin
      .addCase(toggleAdmin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(toggleAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = state.data.map((i) =>
          i._id === action.payload ? { ...i, isAdmin: !i.isAdmin } : i
        )
      })
      .addCase(toggleAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || null
      })
  },
})

export const { actions } = slice
export const { reducer } = slice
