import { StateSchema } from '@app/redux'

export const getActiveTab = (state: StateSchema) =>
  state?.articleEditor?.activeTab || 'settings'

export const getCategory = (state: StateSchema) =>
  state?.articleEditor?.article?.category || null

export const getTitle = (state: StateSchema) =>
  state?.articleEditor?.article?.title || ''

export const getDescription = (state: StateSchema) =>
  state?.articleEditor?.article?.description || ''
