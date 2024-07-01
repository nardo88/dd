'use client'

import { FC } from 'react'
import { classNames } from '@shared/helpers/classNames'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import cls from './Editor.module.scss'
// import dynamic from 'next/dynamic'

interface EditorProps {
  className?: string
  label?: string
  errorText?: string
  value: string
}

export const Editor: FC<EditorProps> = (props) => {
  const { className, label, errorText, value } = props

  return (
    <div className={classNames(cls.Editor, {}, [className])}>
      {label && <span className={cls.label}>{label}</span>}
      <ReactQuill value={value} />
      {errorText && <span className={cls.error}>{errorText}</span>}
    </div>
  )
}
