import { INotificationData } from '@entities/Notifications'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { getData } from './getData'

interface IInputData {
  id: string
  addNotification: (opt: INotificationData) => void
}

export const remove = createAsyncThunk<void, IInputData, { rejectValue: string }>(
  'remove',
  async (props, thunkApi) => {
    try {
      const { id, addNotification } = props
      await api.delete(`/users/${id}`)
      addNotification({ message: 'Пользователь успешно удален' })
      thunkApi.dispatch(getData())
      thunkApi.fulfillWithValue(null)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
