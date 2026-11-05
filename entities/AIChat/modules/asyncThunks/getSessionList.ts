import { StateSchema } from '@app/redux'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { AiChatState, IAISessionListResponse } from '../../types'
import { PAGE_COUNT } from '../consts'

interface IThunkAPI {
  rejectValue: string
}

export const getSessionList = createAsyncThunk<IAISessionListResponse, void, IThunkAPI>(
  'getSessionList',
  async (_, thunkApi) => {
    try {
      const _state = thunkApi.getState() as StateSchema
      const state = _state.aiChat as AiChatState
      const { data } = await api.get<IAISessionListResponse>('/ai/get-session-list', {
        params: { page: state.sessionsCurrentPage, pageCount: PAGE_COUNT },
      })

      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message)
    }
  }
)
