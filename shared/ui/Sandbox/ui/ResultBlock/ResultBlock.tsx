import { FC, forwardRef, useEffect, useRef, useState } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { Browser } from '@shared/ui/Icons/Browser'
import { TerminalIcon } from '@shared/ui/Icons/TerminalIcon'
import { Terminal } from '@shared/ui/Terminal/Terminal'

import { PreviewFrame } from '../PreviewFrame/PreviewFrame'
import { SimpleTerminal } from '../SimpleTerminal/SimpleTerminal'

import cls from './ResultBlock.module.scss'

interface IResultBlockProps {
  className?: string
  css: string
  html: string
  javaScript: string
}

export const ResultBlock = forwardRef<HTMLDivElement, IResultBlockProps>((props, ref) => {
  const { className, css, html, javaScript } = props

  const [activeTerminal, setActiveTerminal] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const frame = useRef<HTMLIFrameElement | null>(null)
  const terminal = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (!frame.current) return
    if (activeTerminal) {
      frame.current.style.height = 'calc(100% - 285px)'
    } else {
      frame.current.style.height = 'calc(100% - 35px)'
    }
  }, [activeTerminal])

  return (
    <div className={classNames(cls.result, {}, [className])} ref={ref}>
      <div className={cls.frameWrapper}>
        <PreviewFrame
          getRef={(r) => (frame.current = r)}
          className={cls.frame}
          css={css}
          html={html}
          javaScript={javaScript}
        />
        {activeTerminal && (
          <>
            <SimpleTerminal className={cls.logs} messages={logs} ref={terminal} />
          </>
        )}
      </div>
      <div className={cls.frameBottom}>
        <TerminalIcon
          onClick={() => setActiveTerminal((p) => !p)}
          className={classNames(cls.terminalIcon, { [cls.activeTerminal]: activeTerminal })}
        />
      </div>
    </div>
  )
})
