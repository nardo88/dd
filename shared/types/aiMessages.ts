export interface IAIParts {
  type: 'text'
  text: string
}

export interface IAIMessage {
  _id: string
  sessionId: string
  role: 'user' | 'assistant'
  parts: IAIParts[]
  createdAt: number
  updatedAt: number
}
