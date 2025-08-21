import { StateSchema } from '@app/redux'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { PAGE_COUNT } from '../consts'
import { IData, SandboxListState } from '../types'

interface IOutputData {
  total: number
  data: IData[]
}

interface IThunkAPI {
  rejectValue: string
}

export const getSandboxList = createAsyncThunk<IOutputData, void, IThunkAPI>(
  'getArticleData',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as StateSchema
      const { currentPage, filter } = state.sandboxList as SandboxListState
      const { data } = await api.get<IOutputData>('/sandbox/get-list', {
        params: { page: currentPage, pageCount: PAGE_COUNT, filter },
      })
      return thunkApi.fulfillWithValue({ total: data.total, data: data.data })
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message)
    }
  }
)
