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
}
