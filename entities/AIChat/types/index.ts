import { IAIMessage } from '@shared/types/aiMessages'

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
}

export type ChatStatus = 'submitted' | 'streaming' | 'ready' | 'error'
