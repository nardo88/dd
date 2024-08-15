import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { StateSchema } from '@app/redux/types'

interface IOptions {
  id: string
}

interface IThunkAPI {
  rejectValue: string
}

export const update = createAsyncThunk<void, IOptions, IThunkAPI>(
  'update',
  async (options, thunkApi) => {
    try {
      const { id } = options

      const { articleEditor } = thunkApi.getState() as StateSchema

      await api.put(`/articles/update/${id}`, {
        category: articleEditor?.article.category,
        title: articleEditor?.article.title,
        body: articleEditor?.article.body,
        description: articleEditor?.article.description,
        image: articleEditor?.article.image,
      })
    } catch (e: any) {
      thunkApi.rejectWithValue(e.message)
    }
  }
)
