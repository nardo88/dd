import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { StateSchema } from '@app/redux/types'
import { useRouter } from 'next/router'

interface IOptions {
  id?: string
  push: (path: string) => void
}

interface IThunkAPI {
  rejectValue: string
}

export const saveArticle = createAsyncThunk<void, IOptions, IThunkAPI>(
  'saveArticle',
  async (options, thunkApi) => {
    try {
      const { id, push } = options

      const { articleEditor } = thunkApi.getState() as StateSchema

      if (!id) {
        const { data } = await api.post('/articles/create', {
          category: articleEditor?.article.category,
          title: articleEditor?.article.title,
          body: articleEditor?.article.body,
          description: articleEditor?.article.description,
          image: articleEditor?.article.image,
        })

        push(`/editor/${data.id}`)
      }
    } catch (e: any) {
      thunkApi.rejectWithValue(e.message)
    }
  }
)
