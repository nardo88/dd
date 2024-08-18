import { createAsyncThunk } from '@reduxjs/toolkit'
import { IResData } from '../../types'
import { api } from '@shared/libs/axios'
import { catalogAction } from '../slice'

interface IOptions {
  currentPage: number
  pageCount: number
  filter: string
}

interface IThunkAPI {
  rejectValue: string
}

export const getArticles = createAsyncThunk<void, IOptions, IThunkAPI>(
  'getArticles',
  async (options, thunkApi) => {
    try {
      const { currentPage, pageCount, filter } = options
      const { data } = await api.get<IResData>('/articles/catalog', {
        params: {
          page: currentPage,
          pageCount,
          filter,
        },
      })

      thunkApi.dispatch(catalogAction.setArticles({ data: data.data, total: data.total }))
    } catch (e: any) {
      return thunkApi.rejectWithValue(e?.response?.data?.details || e.message)
    }
  }
)
