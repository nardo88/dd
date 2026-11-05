import { FC, MutableRefObject, useLayoutEffect, useRef } from 'react'

import { useAppSelector } from '@shared/hooks/redux'
import { Loader } from '@shared/ui/Loader/Loader'
import { Text } from '@shared/ui/Text/Text'

import { getIsLoading, getMessages, getStatus, getStreaming } from '../../modules/selectors'
import { Message } from '../Message/Message'
import { StreamMessage } from '../StreamMessage/StreamMessage'

import cls from './Messages.module.scss'

interface IProps {
  triggerRef: MutableRefObject<HTMLDivElement | null>
  wrapperRef: MutableRefObject<HTMLDivElement | null>
}

export const Messages: FC<IProps> = (props) => {
  const { triggerRef, wrapperRef } = props
  const messages = useAppSelector(getMessages)
  const status = useAppSelector(getStatus)
  const streaming = useAppSelector(getStreaming)
  const isLoading = useAppSelector(getIsLoading)

  const container = useRef<HTMLDivElement | null>(null)
  const stickToBottom = useRef(true)

  // Пользователь начал крутить — выключаем автопрокрутку.
  const handleUserScrollIntent = () => {
    stickToBottom.current = false
  }

  // Когда пользователь докрутил до низа — снова включаем.
  const onScroll = () => {
    const el = container.current
    if (!el) return
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    if (distanceToBottom < 50) {
      stickToBottom.current = true
    }
  }

  useLayoutEffect(() => {
    const el = container.current
    if (!el || !stickToBottom.current) return
    el.scrollTop = el.scrollHeight
  }, [streaming])

  return (
    <div
      className={cls.messages}
      ref={(r) => {
        if (!r) return
        wrapperRef.current = r
        container.current = r
      }}
      onScroll={onScroll}
      onWheel={handleUserScrollIntent}
      onTouchMove={handleUserScrollIntent}
      onKeyDown={(e) => {
        if (['ArrowUp', 'PageUp', 'Home'].includes(e.key)) {
          handleUserScrollIntent()
        }
      }}
    >
      <div ref={triggerRef} />

      {messages.map((item) => (
        <Message key={item._id} {...item} />
      ))}
      {status === 'submitted' && <Text className={cls.think}>Думаю...</Text>}
      <StreamMessage />
      {isLoading && <Loader />}
    </div>
  )
}
