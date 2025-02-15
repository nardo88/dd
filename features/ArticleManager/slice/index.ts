import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleManagerState, IResp } from '../types'
import { OptionType } from '@shared/ui/Select/Select'
import { getArticleList } from '../asyncThunk/getArticleList'
import { remove } from '../asyncThunk/remove'

const initialState: ArticleManagerState = {
  isLoading: false,
  title: '',
  currentPage: 1,
  categoryFilter: null,
  articles: [],
  total: 0,
  error: null,
}

const ArticleEditorSlice = createSlice({
  name: 'ArticleEditorSliceya',
  initialState,
  reducers: {
    changeTitleFilter(state, action: PayloadAction<string>) {
      state.title = action.payload
      state.currentPage = 1
    },
    changeCategoryFilter(state, action: PayloadAction<OptionType | null>) {
      state.categoryFilter = action.payload
      state.currentPage = 1
    },
    setArticles(state, action: PayloadAction<IResp>) {
      state.articles = action.payload.list
      state.total = action.payload.total
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    resetFilter(state) {
      state.title = ''
      state.currentPage = 1
      state.categoryFilter = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getArticleList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getArticleList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(getArticleList.fulfilled, (state, action) => {
        state.isLoading = false
        state.articles = action.payload.list
        state.total = action.payload.total
      })
      .addCase(remove.pending, (state) => {
        state.isLoading = true
      })
      .addCase(remove.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(remove.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { actions: articleManagerAction } = ArticleEditorSlice
export const { reducer: articleManagerReducer } = ArticleEditorSlice
