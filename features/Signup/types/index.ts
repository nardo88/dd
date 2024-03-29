export interface SignupInitialState {
  isLoading: boolean
  email: string
  password: string
  repeatPassword: string
  error: string | null
  result: null | string
  validate: ValidateItem | null
}

export interface IProps {
  email: string
  password: string
  repeatPassword: string
}

export interface ValidateItem {
  email?: string
  password?: string
  repeatPassword?: string
}
