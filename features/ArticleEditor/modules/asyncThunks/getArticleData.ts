import { IArticleData } from '@features/ArticleEditor/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { articleEditorAction } from '../slice'
import { INotificationData } from '@entities/Notifications'

interface IOptions {
  id: string
  addNotification: (val: INotificationData) => void
}

interface IThunkAPI {
  rejectValue: string
}

export const getArticleData = createAsyncThunk<void, IOptions, IThunkAPI>(
  'getArticleData',
  async (options, thunkApi) => {
    const { id, addNotification } = options
    try {
      const { data } = await api.get<IArticleData>(`/articles/get-for-edit/${id}`)
      thunkApi.dispatch(articleEditorAction.setArticleData(data))
    } catch (e: any) {
      addNotification({ message: e?.response?.data?.message || e.message, type: 'error' })
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
