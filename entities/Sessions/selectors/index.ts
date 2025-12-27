import { StateSchema } from '@app/redux'

import { emptyArray } from '@shared/consts/common'

import { DataType } from '../types'

export const getData = (state: StateSchema): DataType[] => state.sessions?.data || emptyArray
export const getTotal = (state: StateSchema) => state.sessions?.total || 0
export const getCurrentPage = (state: StateSchema) => state.sessions?.currentPage || 1
