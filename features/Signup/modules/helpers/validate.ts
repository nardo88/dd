import { ValidateItem, IProps } from '../../types'
import { isEmail } from '@shared/helpers/validators/isEmail'

export const validateSignUp = (props: IProps): ValidateItem | null => {
  const { email, password, repeatPassword } = props
  const result: ValidateItem = {}

  if (!isEmail(email)) {
    result.email = 'Введите корректный email'
  }

  if (!password.trim()) {
    result.password = 'Введите пароль'
  }

  if (!repeatPassword.trim() || password.trim() !== repeatPassword.trim()) {
    result.repeatPassword = 'Вы ввели не корректный пароль'
  }

  return Object.keys(result).length > 0 ? result : null
}
