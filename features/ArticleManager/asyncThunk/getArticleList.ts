import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { articleManagerAction } from '../slice'
import { IResp } from '../types'

interface IOptions {
  title: string
  category: string
  page: number
}

interface IThunkAPI {
  rejectValue: string
}

export const getArticleList = createAsyncThunk<void, IOptions, IThunkAPI>(
  'getArticleData',
  async (options, thunkApi) => {
    try {
      const { category, page, title } = options

      const { data } = await api.get<IResp>('/articles', {
        params: {
          page,
          pageCount: 10,
          title,
          category,
        },
      })
      thunkApi.dispatch(articleManagerAction.setArticles(data))
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
