import { StateSchema } from '@app/redux'
import { AiChatState } from '@entities/AIChat/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'
import { IAIMessage } from '@shared/types/aiMessages'

interface IThunkAPI {
  rejectValue: string
}

interface IOutputData {
  list: IAIMessage[]
  total: number
}

export const getMessageList = createAsyncThunk<IOutputData, void, IThunkAPI>(
  'getData',
  async (_, thunkApi) => {
    try {
      const _state = thunkApi.getState() as StateSchema
      const state = _state.aiChat as AiChatState
      const { data } = await api.get<IOutputData>(`/ai/get-messages/${state.sessionId}`, {
        params: { page: state.currentPage },
      })
      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message)
    }
  }
)
