import { StateSchema } from '@app/redux'

export const getIsOpenSidebar = (state: StateSchema) => state.sidebar?.isOpen || false
export const getIsLoading = (state: StateSchema) => state.sidebar?.isLoading || false
export const getActiveCategory = (state: StateSchema) => state.sidebar?.activeCategory || null
export const getPreview = (state: StateSchema) => state.sidebar?.articles || []
