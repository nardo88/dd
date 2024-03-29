import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'

export const signUpThunk = createAsyncThunk<
  number,
  { email: string; password: string },
  { rejectValue: string }
>('create new user', async (options, thunkApi) => {
  try {
    const { email, password } = options
    const { status } = await api.post('/user/signup', { email, password })
    return status
  } catch (e: any) {
    return thunkApi.rejectWithValue(
      e.response.data.message || 'Что то пошло не так'
    )
  }
})
