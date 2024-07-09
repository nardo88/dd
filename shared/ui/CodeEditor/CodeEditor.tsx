import { FC } from 'react'
import cls from './CodeEditor.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { Editor } from '@monaco-editor/react'

interface CodeEditorProps {
  className?: string
  value: string
  onChange: (value: string) => void
}

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const { className, onChange, value } = props

  return (
    <div className={classNames(cls.CodeEditor, {}, [className])}>
      <Editor
        height="500px"
        defaultLanguage="typescript"
        defaultValue={value}
        onChange={(value) => {
          if (value) {
            onChange(value)
          }
        }}
        theme="vs-dark"
      />
    </div>
  )
}
