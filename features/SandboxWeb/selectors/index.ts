import { StateSchema } from '@app/redux'

import { defaultCode, defaultSettings } from '../consts'

export const getCode = (state: StateSchema) => state.sandboxWeb?.code || defaultCode
export const getAllCode = (state: StateSchema) => state.sandboxWeb?.allCode || defaultCode
export const getCurrent = (state: StateSchema) => state.sandboxWeb?.current || null
export const getMobileCurrent = (state: StateSchema) => state.sandboxWeb?.mobileCurrent || 'html'
export const getTerminalState = (state: StateSchema) => !!state.sandboxWeb?.showTerminal
export const getLogs = (state: StateSchema) => state.sandboxWeb?.logs || []
export const getIsOpen = (state: StateSchema) => !!state.sandboxWeb?.isOpen
export const getSettings = (state: StateSchema) => state.sandboxWeb?.settings || defaultSettings
export const getError = (state: StateSchema) => state.sandboxWeb?.error || null
export const getTitle = (state: StateSchema) => state.sandboxWeb?.title || ''
