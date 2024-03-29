import { ButtonHTMLAttributes, FC, LegacyRef, ReactNode } from 'react'
import cls from './Button.module.scss'
import { classNames } from '@shared/helpers/classNames'

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

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
    variant = ButtonVariant.PRIMARY,
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
          [cls.primary]: variant === ButtonVariant.PRIMARY,
          [cls.secondary]: variant === ButtonVariant.SECONDARY,
        },
        [className]
      )}
      {...options}>
      {children}
    </button>
  )
}
