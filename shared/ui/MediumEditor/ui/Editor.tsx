'use client'

import { FC, useRef, useState } from 'react'
import { classNames } from '@shared/helpers/classNames'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import './Editor.scss'

interface EditorProps {
  className?: string
  label?: string
  errorText?: string
  value: string
  limit?: number
  onChange: (val: string) => void
}

export const Editor: FC<EditorProps> = (props) => {
  const { className, label, errorText, value, limit, onChange } = props
  const editor = useRef<ReactQuill>(null)
  const [length, setLength] = useState(0)

  return (
    <div className={classNames('Editor', {}, [className])}>
      <div className="top">
        {label && (
          <span
            className={classNames('label', {
              labelError: !!errorText,
            })}>
            {label}
          </span>
        )}
        {limit && (
          <span className="limit">
            {length}/{limit}
          </span>
        )}
      </div>
      <ReactQuill
        ref={editor}
        value={value}
        theme="bubble"
        className={classNames('editor', { error: !!errorText })}
        onChange={(val, _d, _s, e) => {
          if (value === val) return
          const text = e.getLength()
          if (limit !== undefined && text - 1 > limit && editor.current) {
            return editor.current.setEditorContents(
              editor.current.getEditor(),
              value
            )
          }
          if (limit !== undefined) setLength(text - 1)
          onChange(val)
        }}
      />
      {errorText && <span className="errorText">{errorText}</span>}
    </div>
  )
}
