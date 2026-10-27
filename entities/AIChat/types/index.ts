import { IAIMessage } from '@shared/types/aiMessages'

export interface AiChatState {
  isLoading: boolean
  error: null | string
  message: string
  messages: IAIMessage[]
}
