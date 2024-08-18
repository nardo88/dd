export type NotificationType = 'error' | 'success' | 'info'

export interface INotification {
  id: string
  message: string
  delay?: number
  type: NotificationType
}

export interface NotificationSchema {
  list: INotification[]
}
