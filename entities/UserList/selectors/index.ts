import { StateSchema } from '@app/redux'

import { emptyArray } from '@shared/consts/common'

import { IData } from '../types'

export const getIsLoading = (state: StateSchema) => state?.userList?.isLoading || false
export const getError = (state: StateSchema) => state?.userList?.error || null
export const getCurrentPage = (state: StateSchema) => state?.userList?.currentPage || 1
export const getFilter = (state: StateSchema) => state?.userList?.filter || ''
export const getDataList = (state: StateSchema): IData[] => state?.userList?.data || emptyArray
export const getTotal = (state: StateSchema) => state.userList?.total || 0
