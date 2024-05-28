import { createAsyncThunk } from '@reduxjs/toolkit'
import { IResData } from '../../types'
import { api } from '@shared/libs/axios'
import { catalogAction } from '../slice'

interface IOptions {
  curentPage: number
  pageCount: number
}

interface IThunkAPI {
  rejectValue: string
}

export const getArticles = createAsyncThunk<void, IOptions, IThunkAPI>(
  'getArticles',
  async (options, thunkApi) => {
    try {
      const { curentPage, pageCount } = options
      const { data } = await api.get<IResData>('/articles/catalog', {
        params: {
          page: curentPage,
          pageCount,
        },
      })
      thunkApi.dispatch(
        catalogAction.setArticles({ data: data.data, total: data.total })
      )
    } catch (e: any) {
      thunkApi.rejectWithValue(e.message)
    }
  }
)
