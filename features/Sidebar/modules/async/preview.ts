import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@shared/libs/axios'
import { sidebarAction } from '../slice'
import { IPreviewList } from '../types'

interface IThunkAPI {
  rejectValue: string
}

export const preview = createAsyncThunk<void, void, IThunkAPI>('preview', async (_, thunkApi) => {
  try {
    const { data } = await api.get<IPreviewList[]>('/articles/preview')
    thunkApi.dispatch(sidebarAction.setPreview(data))
  } catch (e: any) {
    thunkApi.rejectWithValue(e.message)
  }
})
