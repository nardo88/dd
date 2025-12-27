import { FC, ReactNode } from 'react'

import { classNames } from '@shared/helpers/classNames'

import cls from './Text.module.scss'

export type TextVariant = 'text' | 'error' | 'success' | 'helper' | 'small'

interface TextProps {
  className?: string
  variant?: TextVariant
  children: string | ReactNode
  title?: string
}

export const Text: FC<TextProps> = (props) => {
  const { className, variant = 'text', children, title } = props
  return (
    <>
      {variant === 'text' && (
        <p title={title} className={classNames(cls.text, {}, [className])}>
          {children}
        </p>
      )}
      {variant === 'error' && (
        <p title={title} className={classNames(cls.text, {}, [cls.error, className])}>
          {children}
        </p>
      )}
      {variant === 'success' && (
        <p title={title} className={classNames(cls.text, {}, [cls.success, className])}>
          {children}
        </p>
      )}

      {variant === 'helper' && (
        <p title={title} className={classNames(cls.text, {}, [cls.helper, className])}>
          {children}
        </p>
      )}
      {variant === 'small' && (
        <p title={title} className={classNames(cls.text, {}, [cls.small, className])}>
          {children}
        </p>
      )}
    </>
  )
}
