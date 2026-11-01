import { FC, memo, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

import { classNames } from '@shared/helpers/classNames'
import { IAIMessage } from '@shared/types/aiMessages'
import { CopyIcon } from '@shared/ui/Icons/CopyIcon'
import { Text } from '@shared/ui/Text/Text'

import { copyToClipboard } from '../../modules/helpers/copyToClipboard'

import cls from './Message.module.scss'

const checkContent = (parts: IAIMessage['parts']): boolean =>
  parts.some((part) => part.type === 'text' && part.text.trim())

const getTextFromMessage = (msg: IAIMessage): string => {
  return (
    msg.parts
      ?.filter((part) => part.type === 'text')
      .map((part) => (part as { text: string }).text)
      .join('') || ''
  )
}

export const Message: FC<IAIMessage> = memo(
  (props) => {
    const { parts, role } = props
    const [isCopied, setIsCopied] = useState(false)

    const copy = () => copyToClipboard(props, setIsCopied)

    const hasContent = checkContent(parts)

    if (!hasContent) return null

    return (
      <div className={classNames(cls.message, {}, [cls[role]])}>
        <div className={cls.content}>
          {parts?.map((part, i) => {
            if (role === 'assistant')
              return (
                <ReactMarkdown key={i} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                  {part.text}
                </ReactMarkdown>
              )

            if (part.type === 'text') {
              return (
                <Text className={cls.userMessage} key={i}>
                  {part.text}
                </Text>
              )
            }
            return null
          })}
        </div>
        {role === 'assistant' && (
          <div className={cls.bottom}>
            <CopyIcon
              onClick={copy}
              className={classNames(cls.copy, { [cls.activeCopy]: isCopied })}
            />
          </div>
        )}
      </div>
    )
  },
  (prev, next) => {
    const prevValue = getTextFromMessage(prev)
    const nextValue = getTextFromMessage(next)
    return prevValue === nextValue
  }
)
