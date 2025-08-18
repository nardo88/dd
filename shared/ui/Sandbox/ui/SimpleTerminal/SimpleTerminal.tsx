import { FC, forwardRef } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { Text } from '@shared/ui/Text/Text'

import cls from './SimpleTerminal.module.scss'

interface ISimpleTerminalProps {
  className?: string
  messages: string[]
}

export const SimpleTerminal = forwardRef<HTMLDivElement, ISimpleTerminalProps>((props, ref) => {
  const { className, messages } = props

  return (
    <div className={classNames(cls.simpleTerminal, {}, [className])}>
      <div ref={ref} className={cls.resizer}>
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
