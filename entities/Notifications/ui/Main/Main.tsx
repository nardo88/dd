import { FC } from 'react'
import cls from './Main.module.scss'
import { useAppSelector } from '@shared/hooks/redux'
import { getNotification } from '../../selectors'
import { Notification } from '../Notification/Notification'

export const Main: FC = () => {
  const notification = useAppSelector(getNotification)

  if (!notification.length) return null

  return (
    <div className={cls.Main}>
      {notification.map((item) => (
        <Notification key={item.id} {...item} />
      ))}
    </div>
  )
}
