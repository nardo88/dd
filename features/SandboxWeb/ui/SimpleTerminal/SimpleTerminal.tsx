import { PointerEvent, forwardRef } from 'react'
import { Prism } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { htmlTags } from '@shared/consts/regexp'
import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'

import { getLogs } from '../../selectors'
import { sandboxWebAction } from '../../slice'

import cls from './SimpleTerminal.module.scss'

interface ISimpleTerminalProps {
  className?: string
  resizeHandler: (event: PointerEvent) => void
}

export const SimpleTerminal = forwardRef<HTMLDivElement, ISimpleTerminalProps>((props, ref) => {
  const { className, resizeHandler } = props
  const dispatch = useAppDispatch()

  const logs = useAppSelector(getLogs)

  return (
    <div className={classNames(cls.simpleTerminal, {}, [className])} ref={ref}>
      <div className={cls.resizer} onPointerDown={resizeHandler}>
        Console
        <span className={cls.clear} onClick={() => dispatch(sandboxWebAction.clearLogs())}>
          clear
        </span>
      </div>
      <ul className={cls.list}>
        {logs.map((item) => (
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
