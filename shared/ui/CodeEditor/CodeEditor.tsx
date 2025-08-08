import { FC } from 'react'

import { Editor } from '@monaco-editor/react'

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

  return (
    <div className={classNames(cls.codeEditor, {}, [className])}>
      <Editor
        key={language}
        defaultLanguage={language}
        language={language}
        value={value}
        onChange={(value) => onChange(value || '')}
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
