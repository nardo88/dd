import { IArticle } from '@entities/Articles'

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
}
