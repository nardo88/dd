import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPreviewList, SidebarState } from '../types'

const initialState: SidebarState = {
  error: null,
  isOpen: false,
  isLoading: false,
  articles: [],
  activeCategory: null,
}

const SidebarSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    setPreview(state, action: PayloadAction<IPreviewList[]>) {
      state.articles = action.payload
    },
    setActiveCategory(state, action: PayloadAction<string>) {
      if (state.activeCategory === action.payload) {
        state.activeCategory = null
      } else {
        state.activeCategory = action.payload
      }
    },
  },
})

export const { actions: sidebarAction } = SidebarSlice
export const { reducer: sidebarReducer } = SidebarSlice
