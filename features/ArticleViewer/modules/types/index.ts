import { IBody } from '@shared/ui/Body'

export interface ArticleState {
  body: IBody[]
  error: null | string
  isLoading: boolean
}
