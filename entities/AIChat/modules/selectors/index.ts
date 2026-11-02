import { StateSchema } from '@app/redux'

import { emptyArray } from '@shared/consts/common'
import { IAIMessage } from '@shared/types/aiMessages'

export const getStatus = (state: StateSchema) => state.aiChat?.status || 'ready'
export const getIsLoading = (state: StateSchema) =>
  state.aiChat?.isLoading !== undefined ? state.aiChat?.isLoading : true
export const getSessionId = (state: StateSchema) => state.aiChat?.sessionId || null
export const getMessage = (state: StateSchema) => state.aiChat?.message || ''
export const getTotal = (state: StateSchema) => state.aiChat?.total || 0
export const getCurrentPage = (state: StateSchema) => state.aiChat?.currentPage || 0
export const getStreaming = (state: StateSchema) => state.aiChat?.streaming || ''
export const getMessages = (state: StateSchema): IAIMessage[] =>
  state.aiChat?.messages || emptyArray

export const getError = (state: StateSchema) => state.aiChat?.error || null
