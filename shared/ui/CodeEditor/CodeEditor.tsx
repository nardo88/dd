import { FC, KeyboardEvent, useEffect, useRef } from 'react'

import { Editor } from '@monaco-editor/react'
import { emmetHTML } from 'emmet-monaco-es'

import { classNames } from '@shared/helpers/classNames'
import { EditorStacks } from '@shared/types/codeEditor'

import cls from './CodeEditor.module.scss'

interface CodeEditorProps {
  className?: string
  value: string
  onChange: (value: string) => void
  onKeyDown?: (e: any) => void
  language?: EditorStacks
  wrapper?: HTMLElement | null
}

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const { className, onChange, value, language = 'typescript', wrapper, onKeyDown } = props
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleEditorDidMount = (editor: any, monacoInstance: any) => {
    editorRef.current = editor

    if (language === 'html') {
      emmetHTML(monacoInstance)
    }

    // Настройка JSX для TS
    if (language === 'typescript' && monacoInstance) {
      monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monacoInstance.languages.typescript.JsxEmit.React,
        target: monacoInstance.languages.typescript.ScriptTarget.ESNext,
        allowJs: true,
      })

      // Простая заглушка для React/ReactDOM типов
      monacoInstance.languages.typescript.typescriptDefaults.addExtraLib(`
        declare module 'react';
        declare module 'react-dom';
      `)
    }

    editor.onKeyDown((e: KeyboardEvent) => {
      if (onKeyDown) onKeyDown(e)
    })
  }

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const resizeObserver = new ResizeObserver(() => {
      editorRef.current?.layout()
    })

    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const resizeHandler = () => {
      editorRef.current?.layout()
    }

    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [wrapper])

  return (
    <div className={classNames(cls.codeEditor, {}, [className])} ref={containerRef}>
      <Editor
        key={language}
        defaultLanguage={language}
        language={language}
        value={value}
        onMount={handleEditorDidMount}
        onChange={(v) => onChange(v || '')}
        height="100%"
        theme="vs-dark"
        options={{
          fontFamily: 'JetBrains Mono',
          fontSize: 14,
          lineHeight: 24,
          minimap: { enabled: true },
          scrollBeyondLastLine: true,
          renderWhitespace: 'none',
          automaticLayout: true,
        }}
      />
    </div>
  )
}
