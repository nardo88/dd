import { SandboxStacks } from '@shared/ui/Sandbox'

export type StackType = SandboxStacks | 'web'

export interface IData {
  _id: string
  title: string
  type: StackType
  updatedAt: number
}

export interface SandboxListState {
  currentPage: number
  total: number
  filter: string
  isLoading: boolean
  data: IData[]
}
