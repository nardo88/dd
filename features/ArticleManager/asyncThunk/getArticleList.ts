import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { IResp } from '../types'

interface IOptions {
  title: string
  category: string
  page: number
}

interface IThunkAPI {
  rejectValue: string
}

export const getArticleList = createAsyncThunk<IResp, IOptions, IThunkAPI>(
  'getArticleList',
  async (opt, thunkApi) => {
    const { category, page, title } = opt

    try {
      const { data } = await api.get<IResp>('/articles', {
        params: {
          page,
          pageCount: 10,
          title,
          category,
        },
      })

      return data
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data.message || e.message)
    }
  }
)
