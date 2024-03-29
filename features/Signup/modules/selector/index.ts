// import { RootState } from '@app/redux'
import { StateSchema } from '@app/redux/types'

export const getEmail = (state: StateSchema) => state.signup?.email || ''
export const getPassword = (state: StateSchema) => state.signup?.password || ''
export const getIsLoadingSignUp = (state: StateSchema) =>
  state.signup?.isLoading || false
export const getErrorSignUp = (state: StateSchema) =>
  state.signup?.error || null
export const getRepeatPassword = (state: StateSchema) =>
  state.signup?.repeatPassword || ''
export const signUpResult = (state: StateSchema) => state.signup?.result || null
export const signUpValidate = (state: StateSchema) =>
  state.signup?.validate || null
