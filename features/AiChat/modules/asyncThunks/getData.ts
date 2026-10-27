import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

interface IThunkAPI {
  rejectValue: string
}

export const getData = createAsyncThunk<void, void, IThunkAPI>('getData', async (_, thunkApi) => {
  try {
    // TODO: укажи реальный эндпоинт API
    const { data } = await api.get('/ai-chat', {})
    return data
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response?.data?.message || e.message)
  }
})
