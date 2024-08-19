import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { articleAction } from '../slice'
import { IBody } from '@shared/ui/Body'

interface IThunkAPI {
  rejectValue: string
}

export const getArticle = createAsyncThunk<void, string, IThunkAPI>(
  'getArticles',
  async (articleId, thunkApi) => {
    try {
      const { data } = await api.get<IBody[]>(`/articles/get-one/${articleId}`)
      thunkApi.dispatch(articleAction.setArticle(data))
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
