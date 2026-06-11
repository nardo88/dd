import { StateSchema } from '@app/redux'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/libs/axios'

import { PAGE_COUNT } from '../consts'
import { IData, IUserListSchema } from '../types'

interface IOutputData {
  total: number
  list: IData[]
}

export const getData = createAsyncThunk<IOutputData, void, { rejectValue: string }>(
  'getData',
  async (_, thunkApi) => {
    try {
      const _state = thunkApi.getState() as StateSchema
      const state = _state.userList as IUserListSchema
      const { data } = await api.get('/users', {
        params: { filter: state.filter, page: state.currentPage, pageCount: PAGE_COUNT },
      })
      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e?.message)
    }
  }
)
