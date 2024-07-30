import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleState } from '../types'
import { IBody } from '@shared/ui/Body'
import { getArticle } from '../asyncThunk'

const initialState: ArticleState = {
  body: [],
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
      .addCase(getArticle.fulfilled, (state) => {
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
