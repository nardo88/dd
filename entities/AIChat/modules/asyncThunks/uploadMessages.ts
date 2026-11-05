import { StateSchema } from '@app/redux'
import { AiChatState } from '@entities/AIChat/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'
import { IAIMessage } from '@shared/types/aiMessages'

import { PAGE_COUNT } from '../consts'

interface IOutputData {
  list: IAIMessage[]
  total: number
}
interface IThunkAPI {
  rejectValue: string
}

export const uploadMessages = createAsyncThunk<IOutputData, void, IThunkAPI>(
  'uploadMessages',
  async (_, thunkApi) => {
    try {
      const _state = thunkApi.getState() as StateSchema
      const state = _state.aiChat as AiChatState
      if (!state.sessionId) return { list: [], total: 0 }
      const { data } = await api.get<IOutputData>(`/ai/get-messages/${state.sessionId}`, {
        params: { page: state.currentPage, pageCount: PAGE_COUNT },
      })

      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message)
    }
  }
)
