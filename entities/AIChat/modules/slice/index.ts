import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { emptyArray } from '@shared/consts/common'

import { AiChatState } from '../../types'
import { getMessageList } from '../asyncThunks/getMessageList'
import { getSession } from '../asyncThunks/getSession'

const initialState: AiChatState = {
  isLoading: false,
  error: null,
  message: '',
  messages: emptyArray,
  sessionId: null,
  currentPage: 1,
  total: 0,
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
      .addCase(getMessageList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getMessageList.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages.push(...action.payload.list)
        state.total = action.payload.total
      })
      .addCase(getMessageList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(getSession.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.sessionId = action.payload
      })
      .addCase(getSession.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions } = aiChatSlice
export const { reducer: aiChatReducer } = aiChatSlice
