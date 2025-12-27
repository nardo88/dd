import { INotificationData } from '@entities/Notifications'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { getSessionList } from './getSessionList'

interface IInputData {
  id: string
  addNotification: (opt: INotificationData) => void
}

export const deleteSession = createAsyncThunk<void, IInputData, { rejectValue: string }>(
  'deleteSession',
  async (opt, thunkApi) => {
    const { addNotification, id } = opt
    try {
      await api.delete(`/${id}`)
      addNotification({ message: 'Сессия успешно удалена' })
      thunkApi.dispatch(getSessionList())
      thunkApi.fulfillWithValue(null)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
