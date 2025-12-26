import { ChangeEvent, memo } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { Text } from '@shared/ui/Text/Text'

import cls from './Input.module.scss'

export enum InputTypes {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
}

interface InputProps {
  value: string
  onChange: (v: string) => void
  className?: string
  placeholder?: string
  label?: string
  name?: string
  errorText?: string | null
  type?: InputTypes
  disabled?: boolean
}

export const Input = memo(
  (props: InputProps) => {
    const {
      className,
      value,
      onChange,
      label,
      errorText,
      name,
      placeholder = '',
      type = InputTypes.TEXT,
      disabled = false,
      ...options
    } = props
    return (
      <div className={classNames('', {}, [className])}>
        {label && <label className={cls.label}>{label}</label>}
        <input
          className={cls.input}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          name={name}
          type={type}
          disabled={disabled}
          {...options}
        />
        {errorText && (
          <Text variant="small" className={cls.error}>
            {errorText}
          </Text>
        )}
      </div>
    )
  },
  (prev, next) =>
    prev.value === next.value &&
    prev.errorText === next.errorText &&
    prev.disabled === next.disabled
)
