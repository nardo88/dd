import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'
import { getSessionId } from '@entities/AIChat/modules/selectors'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'

import { getMessageList } from '../../modules/asyncThunks/getMessageList'
import { getSession } from '../../modules/asyncThunks/getSession'
import { aiChatReducer } from '../../modules/slice'
import { Form } from '../Form/Form'
import { Messages } from '../Messages/Messages'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const sessionId = useAppSelector(getSessionId)

  useEffect(() => {
    store.reducerManager.add('aiChat', aiChatReducer)
    dispatch({ type: '@@INIT_AIChat' })
    return () => {
      store.reducerManager.remove('aiChat')
    }
  }, [store])

  useEffect(() => {
    dispatch(getSession())
  }, [])

  useEffect(() => {
    if (!sessionId) return
    dispatch(getMessageList())
  }, [sessionId])

  return (
    <div className={cls.chat}>
      <Messages />
      <Form />
    </div>
  )
}
