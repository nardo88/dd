import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { emptyArray } from '@shared/consts/common'

import { AiChatState } from '../../types'
import { getData } from '../asyncThunks/getData'

const initialState: AiChatState = {
  isLoading: false,
  error: null,
  message: '',
  messages: emptyArray,
}

const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getData.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions } = aiChatSlice
export const { reducer: aiChatReducer } = aiChatSlice
