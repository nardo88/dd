import { StateSchema } from '@app/redux'

export const getLogin = (state: StateSchema) => state.login?.login || ''

export const getpassword = (state: StateSchema) => state.login?.password || ''
export const getError = (state: StateSchema) => state.login?.error || null
