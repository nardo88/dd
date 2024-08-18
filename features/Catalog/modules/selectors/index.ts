import { StateSchema } from '@app/redux'
import { IArticleItem } from '../../types'

const emptyArr: IArticleItem[] = []

export const getTitleFilterValue = (state: StateSchema) => state.catalog?.filter?.title || ''

export const getTotal = (state: StateSchema) => state.catalog?.total || 0

export const getCurrentPage = (state: StateSchema) => state.catalog?.currentPage || 1

export const getError = (state: StateSchema) => state.catalog?.error || null

export const getArticleList = (state: StateSchema) => state.catalog?.articles || emptyArr

export const getIsLoading = (state: StateSchema) => state.catalog?.isLoading || false
