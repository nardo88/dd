import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

export const toggleAdmin = createAsyncThunk<string, string, { rejectValue: string }>(
  'toggleAdmin',
  async (id, thunkApi) => {
    try {
      await api.put(`/users/toggle-admin/${id}`)
      return thunkApi.fulfillWithValue(id)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e?.message)
    }
  }
)
