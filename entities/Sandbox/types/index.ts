import { SandboxStacks } from '@shared/ui/Sandbox'

export type StackType = SandboxStacks | 'web'

export interface IData {
  _id: string
  title: string
  updatedAt: number
  stack: 'javaScript' | 'typeScript' | 'react'
}

export interface SandboxListState {
  currentPage: number
  total: number
  filter: string
  isLoading: boolean
  data: IData[]
  error: null | string
}
