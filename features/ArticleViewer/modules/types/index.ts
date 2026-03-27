import { IBody } from '@shared/ui/Body'
import { AnchorType } from '@shared/ui/Body/types'

export interface INavigation {
  id: string
  title: string
  type: AnchorType
}

export interface ArticleState {
  body: IBody[]
  navigation: INavigation[]
  error: null | string
  isLoading: boolean
}
