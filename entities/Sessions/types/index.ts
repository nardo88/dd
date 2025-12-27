import { ISessions } from '@shared/types/sessions'

export type DataType = Pick<ISessions, '_id' | 'createdAt' | 'ip' | 'os' | 'ttl'>

export interface ISessionsSchema {
  isLoading: boolean
  error: null | string

  data: DataType[]
  total: number
  currentPage: number
}
