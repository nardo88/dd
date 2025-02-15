import { StateSchema } from '@app/redux'
import { createSelector } from '@reduxjs/toolkit'

export const getTitleFilter = (state: StateSchema) => state.articleManager?.title || ''

export const getCategoryFilter = (state: StateSchema) =>
  state.articleManager?.categoryFilter || null

export const getCurrentPage = (state: StateSchema) => state.articleManager?.currentPage || 1

export const getArticleList = createSelector(
  (state: StateSchema) => state.articleManager, // Выбираем часть состояния
  (articleManager) => articleManager?.articles || [] // Возвращаем articles или пустой массив
)

export const getTotal = (state: StateSchema) => state.articleManager?.total || 0
export const getIsLoading = (state: StateSchema) => state.articleManager?.isLoading || false
