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

const fullToolbarOptions = [
  [
    { bold: true },
    { italic: true },
    { underline: true },
    { strike: true },
    { code: true }, // <-- Добавлено
    { link: true },
  ],

  // Заголовки и цитаты
  [
    { header: 1 },
    { header: 2 },
    { blockquote: true }, // <-- Добавлено
  ],

  // Списки и отступы
  [
    { list: 'ordered' },
    { list: 'bullet' },
    { indent: '-1' }, // <-- Уменьшить отступ
    { indent: '+1' }, // <-- Увеличить отступ
  ],

  // Цвета и шрифты
  [
    { color: [] },
    { background: [] },
    { font: [] }, // <-- Добавлено (если нужны шрифты)
  ],

  // Размер текста
  [{ size: ['small', false, 'large', 'huge'] }],

  // Надстрочный/подстрочный текст
  [{ script: 'sub' }, { script: 'super' }],

  // Выравнивание и направление текста
  [
    { align: null }, // по умолчанию (left)
    { align: 'center' },
    { align: 'right' },
    { align: 'justify' },
    { direction: 'rtl' }, // <-- Добавлено (RTL текст)
  ],

  // Дополнительные элементы
  [
    { 'code-block': true }, // <-- Добавлено
    { formula: true }, // <-- Если используется модуль формул
    { image: true }, // <-- Добавлено
    { video: true }, // <-- Добавлено
    { clean: true }, // <-- Кнопка очистки форматирования
  ],
]

const modules = {
  toolbar: fullToolbarOptions,
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
        modules={modules}
        value={value}
        theme="bubble"
        className={classNames('editor', { error: !!errorText })}
        onChange={(val, _d, _s, e) => {
          if (value === val) return
          const text = e.getLength()
          if (limit !== undefined && text - 1 > limit && editor.current) {
            return editor.current.setEditorContents(editor.current.getEditor(), value)
          }
          if (limit !== undefined) setLength(text - 1)
          onChange(val)
        }}
        formats={[
          'bold',
          'italic',
          'underline',
          'strike',
          'code',
          'link',
          'header',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'color',
          'background',
          'font',
          'size',
          'script',
          'align',
          'direction',
          'code-block',
          'formula',
          'image',
          'video',
          'clean',
        ]}
      />
      {errorText && <span className="errorText">{errorText}</span>}
    </div>
  )
}
