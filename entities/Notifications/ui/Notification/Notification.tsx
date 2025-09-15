import { FC, useEffect, useRef } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch } from '@shared/hooks/redux'
import { CloseIcon } from '@shared/ui/Icons/CloseIcon'
import { ErrorIcon } from '@shared/ui/Icons/ErrorIcon'
import { InfoIcon } from '@shared/ui/Icons/InfoIcon'
import { SuccessIcon } from '@shared/ui/Icons/SuccessIcon'
import { WarningIcon } from '@shared/ui/Icons/WarningIcon'
import { Text } from '@shared/ui/Text/Text'

import { notificationAction } from '../../slice'
import { INotification } from '../../types'

import cls from './Notification.module.scss'

export const Notification: FC<INotification> = (props) => {
  const { id, message, delay, type } = props
  const ref = useRef<null | HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const hide = () => {
    ref.current?.classList?.add(cls.hide)
    setTimeout(() => {
      dispatch(notificationAction.remove(id))
    }, 300)
  }

  useEffect(() => {
    setTimeout(() => {
      ref.current?.classList.add(cls.show)
    })
  }, [])

  useEffect(() => {
    let isNeed = true
    if (delay) {
      setTimeout(() => {
        if (isNeed) hide()
      }, delay)

      return () => {
        isNeed = false
      }
    }
  }, [delay])

  return (
    <div ref={ref} onClick={hide} className={classNames(cls.notification, {}, [cls[type]])}>
      <div className={cls.iconWrapper}>
        {type === 'success' && <SuccessIcon className={cls.successIcon} />}
        {type === 'info' && <InfoIcon className={cls.infoIcon} />}
        {type === 'error' && <ErrorIcon className={cls.errorIcon} />}
        {type === 'warning' && <WarningIcon className={cls.warningIcon} />}
      </div>
      <div>
        <div className={classNames(cls.type, {}, [cls[type]])}>{type}</div>
        <Text className={classNames(cls.text, {}, [cls[type]])}>{message}</Text>
      </div>
      <CloseIcon className={classNames(cls.close, {}, [cls[type]])} />
      {!!delay && (
        <div
          className={classNames(cls.progress, {}, [cls[type]])}
          style={{ animationDuration: `${delay / 1000}s` }}
        />
      )}
    </div>
  )
}
