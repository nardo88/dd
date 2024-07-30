import { StateSchema } from '@app/redux'

export const getIsOpenSidebar = (state: StateSchema) =>
  state.sidebar?.isOpen || false
