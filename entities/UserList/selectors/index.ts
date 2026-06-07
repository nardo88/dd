import { StateSchema } from '@app/redux'

export const getIsLoading = (state: StateSchema) => state?.userList?.isLoading || false
export const getCurrentPage = (state: StateSchema) => state?.userList?.currentPage || 1
