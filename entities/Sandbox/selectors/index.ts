import { StateSchema } from '@app/redux'

export const getFilterTitle = (state: StateSchema) => state.sandboxList?.filters?.title || ''
export const getStackTitle = (state: StateSchema) => state.sandboxList?.filters?.type || 'all'
