import { MutableRefObject, PointerEvent, forwardRef, useEffect, useRef } from 'react'

import { sandboxWebAction } from '@features/SandboxWeb/slice'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { TerminalIcon } from '@shared/ui/Icons/TerminalIcon'

import { getTerminalState } from '../../selectors'
import { ILog } from '../../types'
import { PreviewFrame } from '../PreviewFrame/PreviewFrame'
import { SimpleTerminal } from '../SimpleTerminal/SimpleTerminal'

import cls from './ResultBlock.module.scss'

export const ResultBlock = forwardRef<HTMLDivElement>((_props, ref) => {
  const dispatch = useAppDispatch()
  const terminalState = useAppSelector(getTerminalState)

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
      frame.style.height = `calc(100% - ${terminalHeight}px - 35px)`
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

  const addLog = (log: ILog) => {
    dispatch(sandboxWebAction.addLog(log))
    setTimeout(() => {
      if (!terminalRef.current) return
      const list = terminalRef.current.childNodes[1] as Element
      list.scrollTo(0, list.clientHeight + 999)
    })
  }

  useEffect(() => {
    if (!frameRef.current) return
    if (terminalState) {
      frameRef.current.style.height = 'calc(100% - 285px)'
    } else {
      frameRef.current.style.height = 'calc(100% - 35px)'
    }
  }, [terminalState])

  return (
    <div className={cls.result} ref={ref}>
      <div className={cls.frameWrapper}>
        <PreviewFrame getRef={(r) => (frameRef.current = r)} addLog={addLog} />
        {terminalState && <SimpleTerminal ref={terminalRef} resizeHandler={resize} />}
      </div>
      <div className={cls.frameBottom}>
        <TerminalIcon
          onClick={() => dispatch(sandboxWebAction.toggleTerminal())}
          className={classNames(cls.terminalIcon, { [cls.activeTerminal]: terminalState })}
        />
      </div>
    </div>
  )
})
