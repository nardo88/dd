import { INotificationData } from '@entities/Notifications'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { getSandboxList } from './getSandboxList'

interface IOptions {
  id: string
  addNotification: (opt: INotificationData) => void
}

interface IThunkAPI {
  rejectValue: string
}

export const remove = createAsyncThunk<void, IOptions, IThunkAPI>(
  'remove',
  async (options, thunkApi) => {
    try {
      const { id, addNotification } = options
      await api.delete(`/sandbox/${id}`)
      addNotification({
        message: 'Элемент успешно удален',
        type: 'success',
        delay: 3000,
      })
      thunkApi.dispatch(getSandboxList())
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
