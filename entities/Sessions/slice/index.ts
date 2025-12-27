import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { emptyArray } from '@shared/consts/common'

import { deleteSession } from '../thunks/deleteSession'
import { getSessionList } from '../thunks/getSessionList'
import { DataType, ISessionsSchema } from '../types'

const initialState: ISessionsSchema = {
  error: null,
  isLoading: false,

  data: emptyArray,
  currentPage: 1,
  total: 0,
}

const slice = createSlice({
  name: 'sliceName',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
  extraReducers(builder) {
    builder
      // Получение данных
      .addCase(getSessionList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getSessionList.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.list
        state.total = action.payload.total
      })
      .addCase(getSessionList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || null
      })
      // Удаление данных
      .addCase(deleteSession.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteSession.fulfilled, (state) => {
        state.isLoading = false
        state.currentPage = 1
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || null
      })
  },
})

export const { actions } = slice
export const { reducer } = slice
