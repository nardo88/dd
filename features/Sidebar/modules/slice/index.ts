import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPreviewList, SidebarState } from '../types'
import { preview } from '../async/preview'

const initialState: SidebarState = {
  error: null,
  isOpen: false,
  isLoading: false,
  articles: [],
  activeCategory: null,
}

const SidebarSlice = createSlice({
  name: 'sidebarSlice',
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
  extraReducers(builder) {
    builder.addCase(preview.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(preview.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(preview.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  },
})

export const { actions: sidebarAction } = SidebarSlice
export const { reducer: sidebarReducer } = SidebarSlice
