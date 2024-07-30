import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SidebarState } from '../types'

const initialState: SidebarState = {
  error: null,
  isOpen: false,
  isLoading: false,
}

const SidebarSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
  },
})

export const { actions: sidebarAction } = SidebarSlice
export const { reducer: sidebarReducer } = SidebarSlice
