import { FC } from 'react'

import { useAppSelector } from '@shared/hooks/redux'
import { Text } from '@shared/ui/Text/Text'

import { getMessages } from '../../modules/selectors'
import { Message } from '../Message/Message'

import cls from './Messages.module.scss'

export const Messages: FC = () => {
  const messages = useAppSelector(getMessages)
  return (
    <div className={cls.messages}>
      {!messages.length && (
        <Text className={cls.empty} variant="helper">
          Нет сообщений
        </Text>
      )}
      {messages.map((item) => (
        <Message key={item._id} {...item} />
      ))}
    </div>
  )
}
