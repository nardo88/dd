export type NotificationType = 'error' | 'info' | 'warning' | 'success'
export type NotificationTimeoutType = 5000 | 3000 | 0

export interface INotification {
  id: string
  message: string
  delay?: NotificationTimeoutType
  type: NotificationType
}

export interface NotificationSchema {
  list: INotification[]
}
