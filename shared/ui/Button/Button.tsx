import { ButtonHTMLAttributes, FC, LegacyRef, ReactNode } from 'react'

import { classNames } from '@shared/helpers/classNames'

import cls from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: string | ReactNode
  variant?: ButtonVariant
  ref?: LegacyRef<HTMLButtonElement> | undefined
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    variant = 'primary',
    onClick,
    ref,
    type = 'button',
    ...options
  } = props

  return (
    <button
      ref={ref}
      onClick={onClick}
      type={type}
      className={classNames(
        cls.Button,
        {
          [cls.primary]: variant === 'primary',
          [cls.secondary]: variant === 'secondary',
          [cls.icon]: variant === 'icon',
        },
        [className]
      )}
      {...options}
    >
      {children}
    </button>
  )
}
