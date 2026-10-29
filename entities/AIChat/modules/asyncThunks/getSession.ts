import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

export const getSession = createAsyncThunk<string, void, { rejectValue: string }>(
  'getSession',
  async (_, thunkApi) => {
    try {
      const { data } = await api.get<{ sessionId: string }>('/ai/get-session')
      return thunkApi.fulfillWithValue(data.sessionId)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
