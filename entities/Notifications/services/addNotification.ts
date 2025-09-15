import { useDispatch } from 'react-redux'

import { createId } from '@shared/helpers/createId/createId'

import { notificationAction } from '../slice'
import { NotificationTimeoutType, NotificationType } from '../types'

export interface INotificationData {
  message: string
  type?: NotificationType
  delay?: NotificationTimeoutType
}

export const useNotification = () => {
  const dispatch = useDispatch()

  return {
    addNotification: (opt: INotificationData) => {
      const { message, type = 'info', delay = 3000 } = opt
      dispatch(notificationAction.add({ id: createId(), type, message, delay }))
    },
  }
}
