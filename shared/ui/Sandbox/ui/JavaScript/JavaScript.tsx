import { type FC, useEffect, useRef, useState } from 'react'

import { LanguageVariants } from '@shared/types/body'
import { Button } from '@shared/ui/Button/Button'
import { CodeEditor } from '@shared/ui/CodeEditor/CodeEditor'
import { type ITerminalRef, Terminal } from '@shared/ui/Terminal/Terminal'

import cls from './JavaScript.module.scss'

interface IJavaScriptProps {
  language: LanguageVariants
  code?: string
  canRun?: boolean
}

export const JavaScript: FC<IJavaScriptProps> = (props) => {
  const { language, canRun, code } = props

  const [value, setValue] = useState(code || '')
  const [isRunning, setIsRunning] = useState(false)
  const workerRef = useRef<Worker | null>(null)
  const terminal = useRef<ITerminalRef | null>(null)

  const executeCode = () => {
    if (!workerRef.current) return
    setIsRunning(true)
    terminal.current?.clear()
    workerRef.current.postMessage({ code: value })
  }

  useEffect(() => {
    const worker = new Worker('/workers/javascript.js', {
      type: 'module',
    })
    worker.onmessage = (e) => {
      const { type, data } = e.data
      if (type === 'stdout') terminal.current?.print(data)
      if (type === 'stderr') terminal.current?.print(`\x1b[31m${data}\x1b[0m\r`)
      setIsRunning(false)
    }
    workerRef.current = worker
    return () => worker.terminate()
  }, [])

  return (
    <div className={cls.main}>
      <CodeEditor onChange={setValue} value={value} language={language} />
      {canRun && (
        <>
          <div className={cls.btnWrapper}>
            <Button onClick={() => terminal.current?.clear()} disabled={isRunning}>
              Очистить терминал
            </Button>
            <Button onClick={executeCode} disabled={isRunning}>
              {isRunning ? 'Выполняется...' : 'Выполнить'}
            </Button>
          </div>
          <Terminal ref={terminal} />
        </>
      )}
    </div>
  )
}
