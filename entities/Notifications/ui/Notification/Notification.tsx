import { FC, useEffect, useRef } from 'react'
import cls from './Notification.module.scss'
import { INotification } from '../../types'
import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch } from '@shared/hooks/redux'
import { notificationAction } from '../../slice'
import { Text } from '@shared/ui/Text/Text'
import { InfoIcon } from '@shared/ui/Icons/InfoIcon'
import { SuccessIcon } from '@shared/ui/Icons/SuccessIcon'
import { ErrorIcon } from '@shared/ui/Icons/ErrorIcon'
import { CloseIcon } from '@shared/ui/Icons/CloseIcon'

export const Notification: FC<INotification> = (props) => {
  const { id, message, delay, type } = props
  const wrapper = useRef<null | HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const hide = () => {
    if (wrapper.current) {
      wrapper.current.classList.remove(cls.comeIn)
      wrapper.current.classList.add(cls.hide)
      setTimeout(() => {
        dispatch(notificationAction.remove(id))
      }, 300)
    }
  }

  useEffect(() => {
    let isNeed = true
    if (delay) {
      setTimeout(() => {
        hide()
      }, delay)

      return () => {
        isNeed = false
      }
    }
  }, [delay])

  useEffect(() => {
    if (wrapper.current) {
      wrapper.current.classList.add(cls.comeIn)
    }
  }, [])

  return (
    <div className={cls.wrapper} ref={wrapper}>
      <div className={classNames(cls.Notification, {}, [cls[type]])}>
        {type === 'info' && <InfoIcon />}
        {type === 'success' && <SuccessIcon />}
        {type === 'error' && <ErrorIcon />}
        <Text>{message}</Text>
        <CloseIcon className={cls.close} onClick={hide} />

        {delay && (
          <div className={cls.progress} style={{ animationDuration: `${delay / 1000}s` }} />
        )}
      </div>
    </div>
  )
}
