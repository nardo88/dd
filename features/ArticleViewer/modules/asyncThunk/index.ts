import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'
import { IBody } from '@shared/ui/Body'

import { INavigation } from '../types'

interface IThunkAPI {
  rejectValue: string
}

interface IOutput {
  body: IBody[]
  navigation: INavigation[]
}

export const getArticle = createAsyncThunk<IOutput, string, IThunkAPI>(
  'getArticles',
  async (articleId, thunkApi) => {
    try {
      const { data } = await api.get<IOutput>(`/articles/get-one/${articleId}`)
      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
