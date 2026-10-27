import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { aiChatReducer } from '../../modules/slice'
import { Form } from '../Form/Form'
import { Messages } from '../Messages/Messages'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    store.reducerManager.add('aiChat', aiChatReducer)
    return () => {
      store.reducerManager.remove('aiChat')
    }
  }, [store])

  return (
    <div className={cls.chat}>
      <Messages />
      <Form />
    </div>
  )
}
