import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { LanguageVariants } from '@shared/types/body'

import { SandboxState } from '../types'

const initialState: SandboxState = {
  language: 'typescript',
  isOpen: true,
}

const sandboxSlice = createSlice({
  name: 'sandbox',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen
    },
    setLanguage(state, action: PayloadAction<LanguageVariants>) {
      state.language = action.payload
    },
  },
})

export const { actions: sandboxAction } = sandboxSlice
export const { reducer: sandboxReducer } = sandboxSlice
