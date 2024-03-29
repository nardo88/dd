import { SignupInitialState, ValidateItem } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signUpThunk } from '../services/signUpThunk'

const initialState: SignupInitialState = {
  email: '',
  password: '',
  repeatPassword: '',
  error: null,
  isLoading: false,
  result: null,
  validate: null,
}

const LoginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    changeEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    changePassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    changeRepeatPassword(state, action: PayloadAction<string>) {
      state.repeatPassword = action.payload
    },
    changeValidate(state, action: PayloadAction<null | ValidateItem>) {
      state.validate = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.result = null
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload === 200) {
          state.result =
            'Ваш аккаунт успешно зарегистрирован. Теперь вы можете авторизоваться используя свой логин и пароль.'
          state.email = ''
          state.password = ''
          state.repeatPassword = ''
        } else {
          state.error = 'Что то пошло не так'
        }
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions: signupAction } = LoginSlice
export const { reducer: signupReducer } = LoginSlice
