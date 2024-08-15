import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { StateSchema } from '@app/redux/types'
import { useRouter } from 'next/router'

interface IOptions {
  push: (path: string) => void
}

interface IThunkAPI {
  rejectValue: string
}

export const create = createAsyncThunk<void, IOptions, IThunkAPI>(
  'create',
  async (options, thunkApi) => {
    try {
      const { push } = options

      const { articleEditor } = thunkApi.getState() as StateSchema

      const { data } = await api.post('/articles/create', {
        category: articleEditor?.article.category,
        title: articleEditor?.article.title,
        body: articleEditor?.article.body,
        description: articleEditor?.article.description,
        image: articleEditor?.article.image,
      })

      push(`/editor/${data.id}`)
    } catch (e: any) {
      thunkApi.rejectWithValue(e.message)
    }
  }
)
