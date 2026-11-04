import { IAIMessage } from '@shared/types/aiMessages'

export interface IAISessions {
  _id: string
  createdAt: number
  message: string
}

export interface IAISessionListResponse {
  list: IAISessions[]
  total: number
}

export interface AiChatState {
  isLoading: boolean
  error: null | string
  message: string
  streaming: string
  messages: IAIMessage[]
  sessionId: string | null
  currentPage: number
  total: number
  status: ChatStatus
  sessions: IAISessions[]
  sessionsTotal: number
  sessionsCurrentPage: number
  isSessionsLoading: boolean
  sessionsError: null | string
}

export type ChatStatus = 'submitted' | 'streaming' | 'ready' | 'error'
