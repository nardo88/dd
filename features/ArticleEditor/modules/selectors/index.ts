import { StateSchema } from '@app/redux'

export const getActiveTab = (state: StateSchema) =>
  state?.articleEditor?.activeTab || 'settings'
