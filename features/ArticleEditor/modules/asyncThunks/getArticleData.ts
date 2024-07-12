import { IArticleData } from '@features/ArticleEditor/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { articleEditorAction } from '../slice'

interface IOptions {
  id: string
}

interface IThunkAPI {
  rejectValue: string
}

export const getArticleData = createAsyncThunk<void, IOptions, IThunkAPI>(
  'getArticleData',
  async (options, thunkApi) => {
    try {
      const { id } = options
      const { data } = await api.get<IArticleData>(
        `/articles/get-for-edit/${id}`
      )
      thunkApi.dispatch(articleEditorAction.setArticleData(data))
    } catch (e: any) {
      thunkApi.rejectWithValue(e.message)
    }
  }
)
