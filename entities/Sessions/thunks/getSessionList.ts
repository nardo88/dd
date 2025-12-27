import { StateSchema } from '@app/redux'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { PAGE_COUNT } from '../consts'
import { DataType, ISessionsSchema } from '../types'

interface IOutputData {
  list: DataType[]
  total: number
}

export const getSessionList = createAsyncThunk<IOutputData, void, { rejectValue: string }>(
  'getSessionList',
  async (_, thunkApi) => {
    try {
      const _state = thunkApi.getState() as StateSchema
      const state = _state.sessions as ISessionsSchema
      const { data } = await api.get<IOutputData>('/session-list', {
        params: { page: state.currentPage, pageCount: PAGE_COUNT },
      })
      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
