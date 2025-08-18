import { FC, PointerEvent, forwardRef } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { Text } from '@shared/ui/Text/Text'

import cls from './SimpleTerminal.module.scss'

interface ISimpleTerminalProps {
  className?: string
  messages: string[]
  resizeHandler: (event: PointerEvent) => void
}

export const SimpleTerminal = forwardRef<HTMLDivElement, ISimpleTerminalProps>((props, ref) => {
  const { className, messages, resizeHandler } = props

  return (
    <div className={classNames(cls.simpleTerminal, {}, [className])} ref={ref}>
      <div className={cls.resizer} onPointerDown={resizeHandler}>
        Console
      </div>
      <ul className={cls.list}>
        {messages.map((item, i) => (
          <li className={cls.message} key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
})
