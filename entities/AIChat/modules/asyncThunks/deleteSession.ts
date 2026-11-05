import { StateSchema } from '@app/redux'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { AiChatState } from '../../types'
import { actions } from '../slice'
import { getSessionList } from './getSessionList'

interface IInputData {
  id: string
}

export const deleteSession = createAsyncThunk<void, IInputData, { rejectValue: string }>(
  'deleteSession',
  async ({ id }, thunkApi) => {
    try {
      await api.delete(`/ai/remove-session/${id}`)

      const _state = thunkApi.getState() as StateSchema
      const state = _state.aiChat as AiChatState

      if (state.sessions.length === 1 && state.sessionsCurrentPage > 1) {
        thunkApi.dispatch(actions.setSessionsCurrentPage(state.sessionsCurrentPage - 1))
      }

      await thunkApi.dispatch(getSessionList())

      return thunkApi.fulfillWithValue(undefined)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message)
    }
  }
)
