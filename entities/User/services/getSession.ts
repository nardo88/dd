import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { IUserData } from '../types'

export const getSession = createAsyncThunk<
  IUserData | null,
  void,
  { rejectValue: string }
>('get user session', async (_, thunkApi) => {
  try {
    const { data } = await api.get<IUserData>('/users/get-user')

    return data
  } catch (e) {
    return thunkApi.rejectWithValue('Пользователь не авторизован')
  }
})
