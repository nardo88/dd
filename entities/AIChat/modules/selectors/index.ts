import { StateSchema } from '@app/redux'

import { emptyArray } from '@shared/consts/common'
import { IAIMessage } from '@shared/types/aiMessages'

export const getIsLoading = (state: StateSchema) => state.aiChat?.isLoading || false
export const getMessage = (state: StateSchema) => state.aiChat?.message || ''
export const getMessages = (state: StateSchema): IAIMessage[] =>
  state.aiChat?.messages || emptyArray

export const getError = (state: StateSchema) => state.aiChat?.error || null
