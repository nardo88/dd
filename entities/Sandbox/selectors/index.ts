import { StateSchema } from '@app/redux'

import { IData } from '../types'

const empty: IData[] = []

export const getFilter = (state: StateSchema) => state.sandboxList?.filter || ''
export const getError = (state: StateSchema) => state.sandboxList?.error || null
export const getCurrentPage = (state: StateSchema) => state.sandboxList?.currentPage || 1
export const getTotal = (state: StateSchema) => state.sandboxList?.total || 0
export const getData = (state: StateSchema) => state.sandboxList?.data || empty
export const getIsLoading = (state: StateSchema) => !!state.sandboxList?.isLoading
