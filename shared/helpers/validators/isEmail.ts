import { emailRegexp } from '@shared/consts/regexp'

export const isEmail = (email: string) => emailRegexp.test(email)
