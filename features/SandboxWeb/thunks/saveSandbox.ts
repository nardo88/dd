import { StateSchema } from '@app/redux'
import { INotificationData } from '@entities/Notifications'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { SandboxWebState } from '../types'

interface IThunkAPI {
  rejectValue: string
}

interface IOptions {
  id: string
  addNotification: (opt: INotificationData) => void
}

export const save = createAsyncThunk<void, IOptions, IThunkAPI>(
  'save',
  async (options, thunkApi) => {
    const { addNotification, id } = options
    try {
      const state = thunkApi.getState() as StateSchema
      const { code, settings, title } = state.sandboxWeb as SandboxWebState
      await api.put<string>(`/sandbox/${id}`, {
        ...code,
        js: code.javaScript,
        settings,
        title,
      })
      addNotification({
        message: 'Данные успешно сохранены',
        type: 'success',
        delay: 3000,
      })
    } catch (e: any) {
      addNotification({
        message: e?.response?.data?.message || e?.message || 'Ошибка сохранения',
        type: 'error',
        delay: 5000,
      })
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
