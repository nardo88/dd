import { StateSchema } from '@app/redux'

export const getTitleFilterValue = (state: StateSchema) =>
  state.catalog?.filter?.title || ''

export const getTotal = (state: StateSchema) => state.catalog?.total || 0

export const getCurentPage = (state: StateSchema) =>
  state.catalog?.curentPage || 1

export const getIsOpenSidebar = (state: StateSchema) =>
  state.catalog?.isOpen || false
