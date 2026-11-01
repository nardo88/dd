import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react'

import { useAppSelector } from '@shared/hooks/redux'
import { Text } from '@shared/ui/Text/Text'

import { getMessages, getStatus, getStreaming } from '../../modules/selectors'
import { Message } from '../Message/Message'
import { StreamMessage } from '../StreamMessage/StreamMessage'

import cls from './Messages.module.scss'

export const Messages = forwardRef<HTMLDivElement>((_, ref) => {
  const messages = useAppSelector(getMessages)
  const status = useAppSelector(getStatus)
  const streaming = useAppSelector(getStreaming)

  const container = useRef<HTMLDivElement | null>(null)
  const stickToBottom = useRef(true)

  useImperativeHandle(ref, () => container.current as HTMLDivElement, [])

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
      ref={container}
      onScroll={onScroll}
      onWheel={handleUserScrollIntent}
      onTouchMove={handleUserScrollIntent}
      onKeyDown={(e) => {
        if (['ArrowUp', 'PageUp', 'Home'].includes(e.key)) {
          handleUserScrollIntent()
        }
      }}
    >
      {!messages.length && (
        <Text className={cls.empty} variant="helper">
          Нет сообщений
        </Text>
      )}
      {messages.map((item) => (
        <Message key={item._id} {...item} />
      ))}
      {status === 'submitted' && <Text className={cls.think}>Дума...</Text>}
      <StreamMessage />
    </div>
  )
})
