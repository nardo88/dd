import { FC, useEffect } from 'react'
import cls from './Notification.module.scss'
import { INotification } from '../../types'
import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch } from '@shared/hooks/redux'
import { notificationAction } from '../../slice'
import { Text } from '@shared/ui/Text/Text'

export const Notification: FC<INotification> = (props) => {
  const { id, message, delay, type } = props
  const dispatch = useAppDispatch()

  //   useEffect(() => {
  //     let isNeed = true
  //     if (delay) {
  //       setTimeout(() => {
  //         dispatch(notificationAction.remove(id))
  //       }, delay)

  //       return () => {
  //         isNeed = false
  //       }
  //     }
  //   }, [delay])

  return (
    <div className={classNames(cls.Notification, {}, [cls[type]])}>
      <Text>{message}</Text>
    </div>
  )
}
