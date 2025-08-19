import { type FC, useRef, useState } from 'react'

import { Button } from '@shared/ui/Button/Button'
import { CodeEditor } from '@shared/ui/CodeEditor/CodeEditor'
import { type ITerminalRef, Terminal } from '@shared/ui/Terminal/Terminal'

import { IMainProps } from '../../types'

import cls from './Php.module.scss'

export const Php: FC<IMainProps> = (props) => {
  const { language, canRun, code } = props

  const [value, setValue] = useState(code || '')
  const [isRunning, setIsRunning] = useState(false)

  const terminal = useRef<ITerminalRef | null>(null)

  const executeCode = async () => {
    setIsRunning(true)
    terminal.current?.clear()
    // создаём новый PHP интерпретатор (каждый запуск — чистое состояние)
    if (!(window as any).PhpWeb) return
    const php = new (window as any).PhpWeb()

    // слушаем вывод
    php.addEventListener('output', (event: any) => {
      const [output] = event.detail
      terminal.current?.print(output)
    })

    php.addEventListener('error', (event: any) => {
      terminal.current?.print(`\x1b[31mОшибка: ${event.detail[0]}\x1b[0m`)
    })

    try {
      await php.run(value) // здесь заменил code → value
    } catch (e) {
      terminal.current?.print(`\x1b[31mСистемная ошибка: ${String(e)}\x1b[0m`)
    }
    setIsRunning(false)
  }

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
