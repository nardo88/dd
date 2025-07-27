import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

import { classNames } from '@shared/helpers/classNames'

import cls from './Terminal.module.scss'

export interface ITerminalRef {
  print: (data: string) => void
  clear: () => void
}

interface ITerminalProps {
  className?: string
}

export const Terminal = forwardRef<ITerminalRef, ITerminalProps>((props, ref) => {
  const { className } = props
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminalInstance = useRef<XTerm | null>(null)
  const fitAddon = useRef<FitAddon | null>(null)

  useImperativeHandle(ref, () => ({
    print: (data: string) => {
      terminalInstance.current?.writeln(data)
    },
    clear: () => {
      terminalInstance.current?.reset()
    },
  }))

  useEffect(() => {
    if (!terminalRef.current || terminalInstance.current) return

    const terminal = new XTerm({
      cursorBlink: true,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 14,
      theme: { background: '#1e1e1e', foreground: '#d4d4d4' },
      allowTransparency: true,
      disableStdin: false,
    })

    const addon = new FitAddon()
    terminal.loadAddon(addon)
    terminal.open(terminalRef.current)
    addon.fit()

    terminal.onData((data) => {
      // Enter
      if (data === '\r') {
        console.log('pressed enter')
      } else if (data === '\x7f') {
        console.log('pressed backspace')
      } else {
        console.log(data)
      }
    })

    terminal.writeln('\x1b[32mГотов к работе...\x1b[0m')

    terminalInstance.current = terminal
    fitAddon.current = addon

    return () => terminal.dispose()
  }, [])

  return (
    <div className={classNames(cls.terminal, {}, [className])}>
      <div ref={terminalRef} className={cls.terminal} style={{ height: '200px' }} />
    </div>
  )
})
Terminal.displayName = 'Terminal'
