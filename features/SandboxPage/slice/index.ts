import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { defaultCode } from '../consts'
import { SandboxState } from '../types'

const initialState: SandboxState = {
  code: defaultCode,
}

const sandboxSlice = createSlice({
  name: 'sandbox',
  initialState,
  reducers: {
    changeLogin(state, action: PayloadAction<string>) {
      //   state.login = action.payload
    },
  },
  //   extraReducers(builder) {
  //     builder
  //       .addCase(loginByEmail.pending, (state) => {
  //         state.isLoading = true
  //       })
  //       .addCase(loginByEmail.rejected, (state, action) => {
  //         state.isLoading = false
  //         state.error = action.payload as string
  //       })
  //   },
})

export const { actions: sandboxAction } = sandboxSlice
export const { reducer: sandboxReducer } = sandboxSlice
