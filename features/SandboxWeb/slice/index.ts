import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { defaultCode, defaultSettings } from '../consts'
import { create } from '../thunks/createSandbox'
import { getData } from '../thunks/getData'
import { ILog, ISettings, IWebCode, SandboxWebState, SectionTypes } from '../types'

const initialState: SandboxWebState = {
  code: defaultCode,
  allCode: defaultCode,
  current: null,
  showTerminal: false,
  logs: [],
  settings: defaultSettings,
  isOpen: false,
  error: null,
  isLoading: false,
}

const sandboxWebSlice = createSlice({
  name: 'sandboxWeb',
  initialState,
  reducers: {
    setCode(state, action: PayloadAction<{ key: keyof IWebCode; value: string }>) {
      const { key, value } = action.payload
      state.code[key] = value
    },
    setAllCode(state, action: PayloadAction<{ key: keyof IWebCode; value: string }>) {
      const { key, value } = action.payload
      state.allCode[key] = value
    },
    setCurrent(state, action: PayloadAction<SectionTypes>) {
      state.current = state.current === action.payload ? null : action.payload
    },
    toggleTerminal(state) {
      state.showTerminal = !state.showTerminal
    },
    clearLogs(state) {
      state.logs = []
    },
    addLog(state, action: PayloadAction<ILog>) {
      state.logs.push(action.payload)
    },
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    setSettings(state, action: PayloadAction<{ key: keyof ISettings; value: boolean }>) {
      const { key, value } = action.payload
      state.settings[key] = value
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getData.fulfilled, (state, action) => {
        const { css, html, js, settings } = action.payload
        state.code = { css, javaScript: js, html }
        state.allCode = { css, javaScript: js, html }
        state.settings = settings
        state.isLoading = false
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(create.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(create.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(create.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
  },
})

export const { actions: sandboxWebAction } = sandboxWebSlice
export const { reducer: sandboxWebReducer } = sandboxWebSlice
