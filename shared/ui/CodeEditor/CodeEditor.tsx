import { FC } from 'react'

import { Editor } from '@monaco-editor/react'
import { emmetHTML } from 'emmet-monaco-es'

import { classNames } from '@shared/helpers/classNames'
import { Stacks } from '@shared/types/sandbox'

import cls from './CodeEditor.module.scss'

interface CodeEditorProps {
  className?: string
  value: string
  onChange: (value: string) => void
  language?: Stacks
}

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const { className, onChange, value, language = 'typescript' } = props

  const handleEditorDidMount = (editor: any, monaco: any) => {
    if (language === 'html') {
      emmetHTML(monaco)
    }
    window.addEventListener('resize', () => {
      editor.layout()
    })
  }

  return (
    <div className={classNames(cls.codeEditor, {}, [className])}>
      <Editor
        key={language}
        defaultLanguage={language}
        onMount={handleEditorDidMount}
        language={language}
        value={value}
        onChange={(value) => onChange(value || '')}
        height="100%" // <— вот это важно
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
