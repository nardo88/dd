import { Socket } from 'socket.io-client'

export interface IUserData {
  email: string
  roles: string[]
  id: string
}

export interface SessionSchema {
  isAuth: boolean
  isLoad: boolean
  isReady: boolean
  userData: IUserData | null
  token: string | null
}
