import { IArticleData } from '@features/ArticleEditor/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useAppSelector } from '@shared/hooks/redux'
import { api } from '@shared/libs/axios'
import { getCategoryFilter, getCurrentPage, getTitleFilter } from '../selectors'
import { articleManagerAction } from '../slice'
import { IArticle, IResp } from '../types'

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
          category: category,
        },
      })
      thunkApi.dispatch(articleManagerAction.setArticles(data))
    } catch (e: any) {
      thunkApi.rejectWithValue(e.message)
    }
  }
)
