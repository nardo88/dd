export interface SidebarState {
  error: null | string
  isOpen: boolean
  isLoading: boolean
  articles: IPreviewList[]
  activeCategory: null | string
}

export interface IPreviewItem {
  title: string
  id: string
}

export interface IPreviewList {
  _id: string
  titles: IPreviewItem[]
}
