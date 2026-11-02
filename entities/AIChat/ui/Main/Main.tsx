import { FC, useEffect, useRef } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'
import { uploadMessages } from '@entities/AIChat/modules/asyncThunks/uploadMessages'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll'

import { getMessageList } from '../../modules/asyncThunks/getMessageList'
import { getSession } from '../../modules/asyncThunks/getSession'
import {
  getCurrentPage,
  getIsLoading,
  getMessages,
  getSessionId,
  getTotal,
} from '../../modules/selectors'
import { actions, aiChatReducer } from '../../modules/slice'
import { Form } from '../Form/Form'
import { Messages } from '../Messages/Messages'
import { TopBlock } from '../TopBlock/TopBlock'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const sessionId = useAppSelector(getSessionId)
  const messages = useAppSelector(getMessages)
  const total = useAppSelector(getTotal)
  const isLoading = useAppSelector(getIsLoading)
  const currentPage = useAppSelector(getCurrentPage)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (!wrapperRef.current) return
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight
    }, 0)
  }

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: () => {
      if (messages.length < total && !isLoading) {
        dispatch(actions.incCurrentPage())
      }
    },
  })

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
    dispatch(getMessageList()).then(scrollToBottom)
  }, [sessionId])

  useEffect(() => {
    if (!sessionId || currentPage === 1) return
    dispatch(uploadMessages())
  }, [currentPage])

  return (
    <div className={cls.chat}>
      <TopBlock />
      <Messages triggerRef={triggerRef} wrapperRef={wrapperRef} />
      <Form scrollToBottom={scrollToBottom} />
    </div>
  )
}
