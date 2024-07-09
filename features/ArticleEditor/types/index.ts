import { IArticle } from '@entities/Articles'
import { IBody } from '@shared/ui/Body'

export type TabVariant = 'settings' | 'content'

export interface IArticleData
  extends Omit<
    IArticle,
    'category' | 'image' | '_id' | 'createdAt' | 'updatedAt' | 'userId'
  > {
  category: null | string
  image: null | string
}

export interface ArticleEditorState {
  isLoading: boolean
  activeTab: TabVariant
  article: IArticleData
  validate: IValidateErrors | null
}

export interface IValidateData {
  title: string
  category: string | null
  body: IBody[]
}

export interface IValidateErrors {
  title?: string
  category?: string
  body?: string
}
