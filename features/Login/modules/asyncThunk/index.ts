import { IFormData } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { USER_TOKEN_KEY } from '@shared/consts/localStorage'

interface IThunkAPI {
  rejectValue: string
}

export const loginByEmail = createAsyncThunk<void, IFormData, IThunkAPI>(
  'loginByEmail',
  async (opt, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/signin', {
        email: opt.login,
        password: opt.password,
      })

      localStorage.setItem(USER_TOKEN_KEY, data.token)
      window.location.href = '/'
    } catch (e: any) {
      return rejectWithValue(e.response.data.message || e.message)
    }
  }
)
