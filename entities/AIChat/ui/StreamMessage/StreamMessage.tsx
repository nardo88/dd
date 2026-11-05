import { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

import { useAppSelector } from '@shared/hooks/redux'

import { getStatus, getStreaming } from '../../modules/selectors'

import cls from './StreamMessage.module.scss'

export const StreamMessage: FC = () => {
  const streaming = useAppSelector(getStreaming)
  const status = useAppSelector(getStatus)

  if (status !== 'streaming') return null

  return (
    <div className={cls.message}>
      {streaming && (
        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{streaming}</ReactMarkdown>
      )}
    </div>
  )
}
