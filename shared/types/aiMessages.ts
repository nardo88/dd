export interface IAIMessage {
  _id: string
  sessionId: string
  role: 'user' | 'assistant'
  parts: any // TODO: add types
  createdAt: number
  updatedAt: number
}
