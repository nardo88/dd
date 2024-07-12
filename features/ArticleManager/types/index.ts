import { OptionType } from '@shared/ui/Select/Select'

export interface ArticleManagerState {
  title: string
  isLoading: boolean
  currentPage: number
  categoryFilter: OptionType | null
  articles: IArticle[]
  total: number
  error: null | string
}

export interface IArticle {
  id: string
  title: string
  category: string
  createdAt: number
  updatedAt: number
}

export interface IResp {
  list: IArticle[]
  total: number
}
