import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { INotificationData } from '@entities/Notifications'
import { StateSchema } from '@app/redux'
import { getArticleList } from './getArticleList'

interface IOptions {
  id: string
  addNotification: (val: INotificationData) => void
}

interface IThunkAPI {
  rejectValue: string
}

export const remove = createAsyncThunk<void, IOptions, IThunkAPI>(
  'remove',
  async (options, thunkApi) => {
    const { addNotification, id } = options
    try {
      await api.delete(`/articles/remove/${id}`)
      addNotification({ message: 'Статья удалена', type: 'success', delay: 3000 })

      const { articleManager: state } = thunkApi.getState() as StateSchema
      thunkApi.dispatch(
        getArticleList({
          category: state?.categoryFilter?.id || '',
          page: state?.currentPage || 1,
          title: state?.title || '',
        })
      )
    } catch (e: any) {
      addNotification({ message: e?.response?.data?.details || e.message, type: 'error' })

      return thunkApi.rejectWithValue(e.message)
    }
  }
)
