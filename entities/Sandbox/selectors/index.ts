import { StateSchema } from '@app/redux'

export const getLanguage = (state: StateSchema) => state.sandbox?.language || 'typescript'
export const getIsOpen = (state: StateSchema) => !!state.sandbox?.isOpen
