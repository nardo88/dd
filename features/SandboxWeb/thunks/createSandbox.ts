import { StateSchema } from '@app/redux'
import { INotificationData } from '@entities/Notifications'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { SandboxWebState } from '../types'

interface IThunkAPI {
  rejectValue: string
}

interface IOptions {
  callback: (id: string) => void
  addNotification: (opt: INotificationData) => void
}

export const create = createAsyncThunk<void, IOptions, IThunkAPI>(
  'create',
  async (options, thunkApi) => {
    try {
      const state = thunkApi.getState() as StateSchema
      const { code, settings } = state.sandboxWeb as SandboxWebState
      const { data } = await api.post<string>('/sandbox/', {
        ...code,
        js: code.javaScript,
        settings,
      })
      options.callback(data)
    } catch (e: any) {
      console.log({ e })
      options.addNotification({
        message: e?.response?.data?.message || e?.message || 'Ошибка сохранения',
        type: 'error',
        delay: 5000,
      })
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
