import { StateSchema } from '@app/redux'

export const getTitleFilter = (state: StateSchema) =>
  state.articleManager?.title || ''

export const getCategoryFilter = (state: StateSchema) =>
  state.articleManager?.categoryFilter || null

export const getCurrentPage = (state: StateSchema) =>
  state.articleManager?.currentPage || 1

export const getArticleList = (state: StateSchema) =>
  state.articleManager?.articles || []

export const getTotal = (state: StateSchema) => state.articleManager?.total || 0
