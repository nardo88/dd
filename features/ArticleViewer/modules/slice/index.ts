import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IBody } from '@shared/ui/Body'

import { getArticle } from '../asyncThunk'
import { ArticleState } from '../types'

const initialState: ArticleState = {
  body: [],
  navigation: [],
  error: null,
  isLoading: false,
}

const ArticleSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    setArticle(state, action: PayloadAction<IBody[]>) {
      state.body = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getArticle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.body = action.payload.body
        state.navigation = action.payload.navigation
        state.isLoading = false
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions: articleAction } = ArticleSlice
export const { reducer: articleReducer } = ArticleSlice
