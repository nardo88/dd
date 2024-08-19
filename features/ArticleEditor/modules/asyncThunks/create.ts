import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { StateSchema } from '@app/redux/types'
import { INotificationData } from '@entities/Notifications'

interface IOptions {
  push: (path: string) => void
  addNotification: (val: INotificationData) => void
}

interface IThunkAPI {
  rejectValue: string
}

export const create = createAsyncThunk<void, IOptions, IThunkAPI>(
  'create',
  async (options, thunkApi) => {
    const { push, addNotification } = options
    try {
      const { articleEditor } = thunkApi.getState() as StateSchema

      const { data } = await api.post('/articles/create', {
        category: articleEditor?.article.category,
        title: articleEditor?.article.title,
        body: articleEditor?.article.body,
        description: articleEditor?.article.description,
        image: articleEditor?.article.image,
      })
      addNotification({ message: 'Статья успешно сохранена', type: 'success' })
      push(`/editor/${data.id}`)
    } catch (e: any) {
      addNotification({ message: e?.response?.data?.details || e.message, type: 'error' })
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
