import { StateSchema } from '@app/redux'

export const getActiveTab = (state: StateSchema) =>
  state?.articleEditor?.activeTab || 'settings'

export const getCategory = (state: StateSchema) =>
  state?.articleEditor?.article?.category || null

export const getTitle = (state: StateSchema) =>
  state?.articleEditor?.article?.title || ''

export const getDescription = (state: StateSchema) =>
  state?.articleEditor?.article?.description || ''

export const getImage = (state: StateSchema) =>
  state.articleEditor?.article?.image || null

export const getBody = (state: StateSchema) =>
  state.articleEditor?.article.body || []

export const getValidate = (state: StateSchema) =>
  state.articleEditor?.validate || null
