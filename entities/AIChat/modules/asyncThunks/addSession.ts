import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

interface IOutputData {
  sessionId: string
}

interface IThunkAPI {
  rejectValue: string
}

export const addSession = createAsyncThunk<IOutputData, void, IThunkAPI>(
  'addSession',
  async (_, thunkApi) => {
    try {
      const { data } = await api.post<IOutputData>('/ai/create-new-session')
      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message)
    }
  }
)
