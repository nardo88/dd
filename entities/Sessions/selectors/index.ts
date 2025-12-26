import { StateSchema } from '@app/redux'

import { emptyArray } from '@shared/consts/common'

import { DataType } from '../types'

export const getData = (state: StateSchema): DataType[] => state.sessions?.data || emptyArray
