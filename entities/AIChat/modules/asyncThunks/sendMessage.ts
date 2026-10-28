import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/api/api'
import { ErrorType } from '@shared/ui/ErrorMessage/ErrorMessage'

interface IOutputData {} // то что thunk вернет

export const sendMessage = createAsyncThunk<IOutputData, void, { rejectValue: ErrorType }>(
  'sendMessage',
  async (filter, thunkApi) => {
    try {
      const { data } = await api.get('/institution-dictionary/get-by-filter', {
        params: { filter },
      })
      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
