export type TabVariant = 'settings' | 'content'

export interface ArticleEditorState {
  isLoading: boolean
  activeTab: TabVariant
}
