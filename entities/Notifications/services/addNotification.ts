import { useDispatch } from 'react-redux'
import { notificationAction } from '../slice'
import { createId } from '@shared/helpers/createId/createId'
import { NotificationType } from '../types'

interface IOptions {
  message: string
  type: NotificationType
  delay?: 5000 | 3000
}

export const useNotification = () => {
  const dispatch = useDispatch()

  return {
    addNotification: (opt: IOptions) => {
      const { message, type, delay } = opt
      dispatch(notificationAction.add({ id: createId(), type, message, delay }))
    },
  }
}
