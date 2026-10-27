import { FC } from 'react'

import { Form } from '../Form/Form'
import { Messages } from '../Messages/Messages'

import cls from './Chat.module.scss'

interface IProps {
  className?: string
}

export const Chat: FC = () => {
  return (
    <div className={cls.chat}>
      <Messages />
      <Form />
    </div>
  )
}
