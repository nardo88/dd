import { LoginInitialState } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: LoginInitialState = {
  login: '',
  password: '',
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
  extraReducers(builder) {},
})

export const { actions: loginAction } = LoginSlice
export const { reducer: loginReducer } = LoginSlice
