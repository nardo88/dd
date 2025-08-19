import { FC, PointerEvent, forwardRef } from 'react'
import { Prism } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { htmlTags } from '@shared/consts/regexp'
import { classNames } from '@shared/helpers/classNames'
import { CloseIcon } from '@shared/ui/Icons/CloseIcon'
import { Text } from '@shared/ui/Text/Text'

import { ILog } from '../../types'

import cls from './SimpleTerminal.module.scss'

interface ISimpleTerminalProps {
  className?: string
  messages: ILog[]
  resizeHandler: (event: PointerEvent) => void
  clearHandler: () => void
}

export const SimpleTerminal = forwardRef<HTMLDivElement, ISimpleTerminalProps>((props, ref) => {
  const { className, messages, resizeHandler, clearHandler } = props

  return (
    <div className={classNames(cls.simpleTerminal, {}, [className])} ref={ref}>
      <div className={cls.resizer} onPointerDown={resizeHandler}>
        Console
        <span className={cls.clear} onClick={clearHandler}>
          clear
        </span>
      </div>
      <ul className={cls.list}>
        {messages.map((item) => (
          <li className={classNames(cls.message, {}, [cls[item.type]])} key={item.id}>
            {item.type === 'info' ? (
              <Prism language={htmlTags.test(item.message) ? 'html' : 'typescript'} style={oneDark}>
                {item.message}
              </Prism>
            ) : (
              item.message
            )}
          </li>
        ))}
      </ul>
    </div>
  )
})
