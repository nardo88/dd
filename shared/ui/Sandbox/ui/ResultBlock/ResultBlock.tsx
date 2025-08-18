import {
  FC,
  ForwardedRef,
  MutableRefObject,
  PointerEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { classNames } from '@shared/helpers/classNames'
import { Browser } from '@shared/ui/Icons/Browser'
import { TerminalIcon } from '@shared/ui/Icons/TerminalIcon'
import { Terminal } from '@shared/ui/Terminal/Terminal'

import { IAllCode, ILog } from '../../types'
import { PreviewFrame } from '../PreviewFrame/PreviewFrame'
import { SimpleTerminal } from '../SimpleTerminal/SimpleTerminal'

import cls from './ResultBlock.module.scss'

interface IResultBlockProps {
  className?: string
  code: IAllCode
}

export const ResultBlock = forwardRef<HTMLDivElement, IResultBlockProps>((props, ref) => {
  const { className, code } = props
  const { css, html, javaScript } = code

  const [activeTerminal, setActiveTerminal] = useState(false)
  const [logs, setLogs] = useState<ILog[]>([])

  const frameRef = useRef<HTMLIFrameElement | null>(null)
  const terminalRef = useRef<HTMLIFrameElement | null>(null)

  const resize = (ev: PointerEvent) => {
    if (ev?.buttons !== 1 || !frameRef.current || !terminalRef.current || !ref) return

    ev.preventDefault()
    ;(ev.target as HTMLElement).setPointerCapture(ev.pointerId) // фиксируем указатель
    document.body.style.userSelect = 'none'

    const refObject = ref as MutableRefObject<HTMLDivElement>
    const wrapper = refObject.current
    const frame = frameRef.current
    const terminal = terminalRef.current

    const tHeight = terminal.getBoundingClientRect().height
    const wHeight = wrapper.getBoundingClientRect().height

    const posY = ev.clientY

    function dragMove(event: globalThis.PointerEvent) {
      const pixelDif = posY - event.clientY
      const terminalHeight = tHeight + pixelDif
      if (terminalHeight < 25 || terminalHeight > wHeight - 34) return
      terminal.style.height = `${terminalHeight}px`
      frame.style.height = `calc(100% - ${terminalHeight}px)`
    }

    const dragEnd = () => {
      document.body.style.userSelect = ''
      ;(ev.target as HTMLElement).releasePointerCapture(ev.pointerId)
      window.removeEventListener('pointermove', dragMove)
      window.removeEventListener('pointerup', dragEnd)
      window.removeEventListener('pointercancel', dragEnd)
    }

    window.addEventListener('pointermove', dragMove)
    window.addEventListener('pointerup', dragEnd)
    window.addEventListener('pointercancel', dragEnd)
  }

  const clear = useCallback(() => {
    setLogs([])
  }, [])

  const addLog = (log: ILog) => {
    setLogs((p) => [...p, log])
    setTimeout(() => {
      if (!terminalRef.current) return
      const list = terminalRef.current.childNodes[1] as Element
      // @ts-ignore
      window.list = list
      console.log(1)
      list.scrollTo(0, list.clientHeight + 999)
    })
  }

  useEffect(() => {
    if (!frameRef.current) return
    if (activeTerminal) {
      frameRef.current.style.height = 'calc(100% - 285px)'
    } else {
      frameRef.current.style.height = 'calc(100% - 35px)'
    }
  }, [activeTerminal])

  return (
    <div className={classNames(cls.result, {}, [className])} ref={ref}>
      <div className={cls.frameWrapper}>
        <PreviewFrame
          getRef={(r) => (frameRef.current = r)}
          className={cls.frame}
          css={css}
          html={html}
          javaScript={javaScript}
          addLog={addLog}
        />
        {activeTerminal && (
          <SimpleTerminal
            className={cls.logs}
            messages={logs}
            ref={terminalRef}
            resizeHandler={resize}
            clearHandler={clear}
          />
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
