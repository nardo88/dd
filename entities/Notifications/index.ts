export { useNotification } from './services/addNotification'
export type { INotificationData } from './services/addNotification'

export { Main as Notifications } from './ui/Main/Main'

export { getNotification } from './selectors'
export { notificationReducer, notificationAction } from './slice'
export type { NotificationSchema, INotification } from './types'
