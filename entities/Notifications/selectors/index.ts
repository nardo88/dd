import { StateSchema } from '@app/redux'

export const getNotification = (state: StateSchema) => state.notification.list
