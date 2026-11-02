import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { emptyArray } from '@shared/consts/common'
import { IAIMessage } from '@shared/types/aiMessages'

import { AiChatState, ChatStatus } from '../../types'
import { getMessageList } from '../asyncThunks/getMessageList'
import { getSession } from '../asyncThunks/getSession'
import { sendMessage } from '../asyncThunks/sendMessage'
import { uploadMessages } from '../asyncThunks/uploadMessages'

const initialState: AiChatState = {
  isLoading: true,
  error: null,
  message: '',
  streaming: '',
  messages: emptyArray,
  sessionId: null,
  currentPage: 1,
  total: 0,
  status: 'ready',
}

const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
    },
    setStreaming(state, action: PayloadAction<string>) {
      state.streaming = action.payload
    },
    addMessages(state, action: PayloadAction<IAIMessage[]>) {
      state.messages.push(...action.payload)
    },
    setStatus(state, action: PayloadAction<ChatStatus>) {
      state.status = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    incCurrentPage(state) {
      state.currentPage = state.currentPage + 1
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
      .addCase(uploadMessages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(uploadMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages = [...action.payload.list, ...state.messages]
        state.total = action.payload.total
      })
      .addCase(uploadMessages.rejected, (state, action) => {
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
      .addCase(sendMessage.pending, (state) => {
        state.error = null
        state.status = 'submitted'
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { id, text } = action.payload
        state.isLoading = false
        state.status = 'ready'
        state.messages = state.messages.map((i) =>
          i._id === id ? { ...i, parts: [{ text, type: 'text' }] } : i
        )
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions } = aiChatSlice
export const { reducer: aiChatReducer } = aiChatSlice
