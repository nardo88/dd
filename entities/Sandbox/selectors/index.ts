import { StateSchema } from '@app/redux'

export const getFilterTitle = (state: StateSchema) => state.sandbox?.filters?.title || ''
export const getStackTitle = (state: StateSchema) => state.sandbox?.filters?.type || 'all'
