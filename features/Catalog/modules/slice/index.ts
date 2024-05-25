import { CatalogState } from '@features/Catalog/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: CatalogState = {
  articles: [],
  error: null,
  filter: {
    category: null,
    title: '',
  },
  isOpen: false,
  isLoading: false,
  total: 0,
  curentPage: 1,
}

const CatalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    changeTitleFilter(state, action: PayloadAction<string>) {
      state.filter.title = action.payload
    },
    setCurentPage(state, action: PayloadAction<number>) {
      state.curentPage = action.payload
    },
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
  },
})

export const { actions: catalogAction } = CatalogSlice
export const { reducer: catalogReducer } = CatalogSlice
