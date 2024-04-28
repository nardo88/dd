import { LoginInitialState } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginByEmail } from '../asyncThunk'

const initialState: LoginInitialState = {
  login: '',
  password: '',
  isLoading: false,
  error: null,
}

const LoginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    changeLogin(state, action: PayloadAction<string>) {
      state.login = action.payload
    },
    changePassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions: loginAction } = LoginSlice
export const { reducer: loginReducer } = LoginSlice
