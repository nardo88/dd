import { IArticle } from '@entities/Articles'

type ArticleType = Pick<
  IArticle,
  'category' | 'createdAt' | 'title' | 'description' | 'image'
>

interface IArticleItem extends ArticleType {
  id: string
}

export interface CatalogState {
  isLoading: boolean
  articles: IArticleItem[]
  total: number
  error: null | string
  filter: {
    title: string
    category: string | null
  }
  curentPage: number
  isOpen: boolean
}
