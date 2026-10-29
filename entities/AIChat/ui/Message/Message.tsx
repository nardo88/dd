import { FC } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { IAIMessage } from '@shared/types/aiMessages'

import cls from './Message.module.scss'

interface IProps {
  className?: string
}

export const Message: FC<IAIMessage> = (props) => {
  const { createdAt } = props

  return <div className={classNames(cls.message, {}, [])}>createdAt</div>
}
