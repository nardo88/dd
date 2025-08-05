import dynamic from 'next/dynamic'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'

import { LanguageVariants } from '@shared/types/body'
import { Button } from '@shared/ui/Button/Button'
import { CodeEditor } from '@shared/ui/CodeEditor/CodeEditor'
import { type ITerminalRef, Terminal } from '@shared/ui/Terminal/Terminal'

import cls from './Python.module.scss'

interface IJavaScriptProps {
  language: LanguageVariants
  code?: string
  canRun?: boolean
}

const loadedPackages = new Set<string>()

// Тип для глобального объекта window с Pyodide
declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<any>
  }
}

export const Python: FC<IJavaScriptProps> = (props) => {
  const { language, canRun, code } = props

  const [value, setValue] = useState(code || '')
  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const pyodideInstance = useRef<any | null>(null)
  const terminal = useRef<ITerminalRef | null>(null)

  const executeCode = async () => {
    if (!value.trim()) {
      return terminal.current?.print('\x1b[31mNo code\x1b[0m')
    }
    if (!pyodideInstance.current || isRunning) return

    setIsRunning(true)
    terminal.current?.clear()

    try {
      pyodideInstance.current.globals.set('user_code', value)
      await pyodideInstance.current.runPythonAsync('run_user_code()')
    } catch (error) {
      terminal.current?.print(`\x1b[31mСистемная ошибка: ${error}\x1b[0m\r\n`)
    } finally {
      setIsRunning(false)
    }
  }

  const loadRequiredPackages = useCallback(async (pyodide: any) => {
    const requiredPackages = ['numpy', 'pandas']
    const packagesToLoad = requiredPackages.filter((pkg) => !loadedPackages.has(pkg))

    if (packagesToLoad.length > 0) {
      await pyodide.loadPackage(packagesToLoad)
      packagesToLoad.forEach((pkg) => loadedPackages.add(pkg))
    }
  }, [])

  const initPyodide = useCallback(async () => {
    if (pyodideInstance.current) return pyodideInstance.current

    try {
      setIsLoading(true)
      terminal.current?.clear()

      if (!window.loadPyodide) {
        terminal.current?.print('\x1b[31mPyodide не загружен из CDN\x1b[0m\r\n')
        return
      }

      const instance = await window.loadPyodide!({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.0/full/',
        stdout: (msg: string) => terminal.current?.print(msg + '\x1b[0m\r'),
        stderr: (msg: string) => terminal.current?.print(`\x1b[31m${msg}\x1b[0m\r`),
      } as any)

      await loadRequiredPackages(instance)

      await instance.runPythonAsync(`
import sys
import traceback
from js import console

def run_user_code():
    try:
        exec(user_code, globals())
    except ValueError:
        print("\\x1b[31mОшибка ввода: убедитесь, что введены числа\\x1b[0m")
    except Exception:
        print("\\x1b[31mОшибка выполнения:\\x1b[0m")
        traceback.print_exc()
`)

      terminal.current?.clear()
      terminal.current?.print('\x1b[32mPython готов к работе!\x1b[0m\r\n')
      pyodideInstance.current = instance
    } catch (error) {
      terminal.current?.print(`\x1b[31mОшибка инициализации: ${error}\x1b[0m\r\n`)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [loadRequiredPackages])

  useEffect(() => {
    initPyodide()
    return () => {
      pyodideInstance.current = null
    }
  }, [initPyodide])

  return (
    <div className={cls.main}>
      <CodeEditor onChange={setValue} value={value} language={language} />
      {canRun && (
        <>
          <div className={cls.btnWrapper}>
            <Button onClick={() => terminal.current?.clear()} disabled={isRunning}>
              Очистить терминал
            </Button>

            <Button onClick={executeCode} disabled={isLoading || isRunning}>
              {isLoading ? 'Загрузка...' : isRunning ? 'Выполняется...' : 'Выполнить'}
            </Button>
          </div>
          <Terminal ref={terminal} />
        </>
      )}
    </div>
  )
}

// Отключаем SSR для этого компонента
export default dynamic(() => Promise.resolve(Python), { ssr: false })
