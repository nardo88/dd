import { UsersType } from '@shared/types/users'

export interface IData extends Pick<UsersType, '_id' | 'email'> {
  userName: string
  isAdmin: boolean
}

export interface IUserListSchema {
  isLoading: boolean
  error: string | null
  data: IData[]
  total: number
  currentPage: number
  filter: string
}
