import { StateSchema } from '@app/redux'

import { defaultCode } from '../consts'

export const getCode = (state: StateSchema) => state.sandboxWeb?.code || defaultCode
export const getAllCode = (state: StateSchema) => state.sandboxWeb?.allCode || defaultCode
export const getCurrent = (state: StateSchema) => state.sandboxWeb?.current || null
export const getTerminalState = (state: StateSchema) => !!state.sandboxWeb?.showTerminal
export const getLogs = (state: StateSchema) => state.sandboxWeb?.logs || []
