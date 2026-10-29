import React, { FC, KeyboardEvent, RefObject, useLayoutEffect, useRef } from 'react'

import { classNames } from '@shared/helpers/classNames'

import { Text } from '../Text/Text'

import cls from './Textarea.module.scss'

interface IOptions {
  textAreaRef: RefObject<HTMLTextAreaElement>
  value: string
  minRows: number
  maxRows: number
}
function useAutosizeTextArea(options: IOptions) {
  const { textAreaRef, value, maxRows = Infinity, minRows = 1 } = options

  useLayoutEffect(() => {
    const textArea = textAreaRef.current
    if (!textArea) return

    textArea.style.height = 'auto'
    textArea.style.overflowY = 'hidden'

    const style = window.getComputedStyle(textArea)
    const lineHeight = parseFloat(style.lineHeight) || 20
    const paddingTop = parseFloat(style.paddingTop) || 0
    const paddingBottom = parseFloat(style.paddingBottom) || 0
    const borderTop = parseFloat(style.borderTopWidth) || 0
    const borderBottom = parseFloat(style.borderBottomWidth) || 0

    // Высота одной строки контента (без padding/border)
    const singleLineContentHeight = lineHeight

    // Полная высота textarea для N строк:
    // N * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom
    const extraHeight = paddingTop + paddingBottom + borderTop + borderBottom

    const minHeight = minRows * singleLineContentHeight + extraHeight
    const maxHeight =
      maxRows === Infinity ? Infinity : maxRows * singleLineContentHeight + extraHeight

    const scrollHeight = textArea.scrollHeight
    let newHeight = Math.max(scrollHeight, minHeight)

    if (newHeight > maxHeight) {
      newHeight = maxHeight
      textArea.style.overflowY = 'auto'
    }

    textArea.style.height = `${newHeight}px`
  }, [value, minRows, maxRows, textAreaRef])
}

interface IProps {
  value: string
  onChange: (val: string) => void
  minRows?: number
  maxRows?: number
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
  label?: string
  disabled?: boolean
  errorText?: string | null
}

export const Textarea: FC<IProps> = ({
  value,
  onChange,
  onKeyDown,
  minRows = 1,
  maxRows = Infinity,
  className,
  placeholder,
  disabled = false,
  errorText = null,
  label,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea({ textAreaRef, value, minRows, maxRows })

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift + Enter — обычный перенос строки (не мешаем браузеру)
    if (event.key === 'Enter' && event.shiftKey) {
      // Позволяем браузеру вставить перевод строки
      if (onKeyDown) onKeyDown(event)
      return
    }

    // Обычный Enter — блокируем перенос строки
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (onKeyDown) onKeyDown(event)
      return
    }

    if (onKeyDown) onKeyDown(event)
  }

  return (
    <div className={classNames(cls.wrapper, { [cls.disabled]: disabled }, [className])}>
      {label && <label className={cls.label}>{label}</label>}
      <textarea
        className={cls.textarea}
        ref={textAreaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        rows={minRows}
      />
      {errorText && (
        <Text variant="small" className={cls.error}>
          {errorText}
        </Text>
      )}
    </div>
  )
}
