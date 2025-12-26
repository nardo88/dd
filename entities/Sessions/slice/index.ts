import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ISessionsSchema } from '../types'

const initialState: ISessionsSchema = {
  error: null,
  isLoading: false,
}

const slice = createSlice({
  name: 'sliceName',
  initialState,
  reducers: {
    // setTitle(state, action: PayloadAction<string>) {
    //   state.title = action.payload
    // },
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
