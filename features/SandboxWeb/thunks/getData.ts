import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'
import { ISandbox } from '@shared/types/sandbox'

interface IThunkAPI {
  rejectValue: string
}

export const getData = createAsyncThunk<ISandbox, string, IThunkAPI>(
  'getData',
  async (id, thunkApi) => {
    try {
      const { data } = await api.get<ISandbox>(`/sandbox/${id}`)
      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
