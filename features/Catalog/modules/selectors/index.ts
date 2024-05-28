import { StateSchema } from '@app/redux'
import { IArticleItem } from '../../types'

const emptyArr: IArticleItem[] = []

export const getTitleFilterValue = (state: StateSchema) =>
  state.catalog?.filter?.title || ''

export const getTotal = (state: StateSchema) => state.catalog?.total || 0

export const getCurentPage = (state: StateSchema) =>
  state.catalog?.curentPage || 1

export const getIsOpenSidebar = (state: StateSchema) =>
  state.catalog?.isOpen || false

export const getArticleList = (state: StateSchema) =>
  state.catalog?.articles || emptyArr

export const getIsLoading = (state: StateSchema) =>
  state.catalog?.isLoading || false
