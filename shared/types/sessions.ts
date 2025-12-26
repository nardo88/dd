export interface ISessions {
  _id: string
  userId: string
  token: string
  ttl: number
  ip: string
  os: string
  createdAt: number
  updatedAt: number
}
