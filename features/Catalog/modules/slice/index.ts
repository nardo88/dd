import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CatalogState, IResData } from '../../types'
import { getArticles } from '../asyncThunk/getArticles'

const initialState: CatalogState = {
  articles: [],
  error: null,
  filter: {
    category: null,
    title: '',
  },
  isLoading: false,
  total: 0,
  currentPage: 1,
}

const CatalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    changeTitleFilter(state, action: PayloadAction<string>) {
      state.filter.title = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setArticles(state, action: PayloadAction<IResData>) {
      state.total = action.payload.total
      state.articles = action.payload.data
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getArticles.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions: catalogAction } = CatalogSlice
export const { reducer: catalogReducer } = CatalogSlice
