import { FC } from 'react'
import cls from './CodeEditor.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { Editor } from '@monaco-editor/react'

interface CodeEditorProps {
  className?: string
  value: string
  onChange: (value: string) => void
  language?: LanguagesType
}

export type LanguagesType = 'python' | 'php' | 'typescript' | 'javascript'

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
          scrollBeyondLastLine: false,
          renderWhitespace: 'none',
          automaticLayout: true,
        }}
      />
    </div>
  )
}
