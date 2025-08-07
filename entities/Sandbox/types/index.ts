import { Stacks } from '@shared/types/sandbox'

export type StackType = Stacks | 'all'

export interface IFilter {
  title: string
  type: StackType
}

export interface IData {
  _id: string
  title: string
  type: Stacks
  updatedAt: number
}

export interface SandboxState {
  currentPage: number
  total: number
  filters: IFilter
  isLoading: boolean
  data: IData[]
}
