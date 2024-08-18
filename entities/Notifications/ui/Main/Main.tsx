import { FC, useEffect } from 'react'
import cls from './Main.module.scss'
import { useAppSelector } from '@shared/hooks/redux'
import { getNotification } from '../../selectors'
import { useNotification } from '../../services/addNotification'
import { Notification } from '../Notification/Notification'

export const Main: FC = () => {
  const notification = useAppSelector(getNotification)
  const { addNotification } = useNotification()

  useEffect(() => {
    addNotification({
      message: 'Success notification for example',
      type: 'success',
    })
    addNotification({
      message: 'Error notification for example',
      type: 'error',
    })
    addNotification({
      message: 'Info notification for example',
      type: 'info',
    })
  }, [])

  if (!notification.length) return null

  return (
    <div className={cls.Main}>
      {notification.map((item) => (
        <Notification key={item.id} {...item} />
      ))}
    </div>
  )
}
