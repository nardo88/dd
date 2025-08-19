import { SandboxStacks } from '@shared/ui/Sandbox'

export type StackType = SandboxStacks | 'web'

export interface IFilter {
  title: string
  type: StackType | 'all'
}

export interface IData {
  _id: string
  title: string
  type: StackType
  updatedAt: number
}

export interface SandboxListState {
  currentPage: number
  total: number
  filters: IFilter
  isLoading: boolean
  data: IData[]
}
