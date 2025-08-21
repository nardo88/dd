import { FC, ReactNode } from 'react'

import { classNames } from '@shared/helpers/classNames'

import cls from './Text.module.scss'

export enum TextVariant {
  TEXT = 'text',
  ERROR = 'error',
  SUCCESS = 'success',
  HELPER = 'helper',
  SMALL = 'small',
}

interface TextProps {
  className?: string
  variant?: TextVariant
  children: string | ReactNode
  title?: string
}

export const Text: FC<TextProps> = (props) => {
  const { className, variant = TextVariant.TEXT, children, title } = props
  return (
    <>
      {variant === TextVariant.TEXT && (
        <p title={title} className={classNames(cls.text, {}, [className])}>
          {children}
        </p>
      )}
      {variant === TextVariant.ERROR && (
        <p title={title} className={classNames(cls.text, {}, [cls.error, className])}>
          {children}
        </p>
      )}
      {variant === TextVariant.SUCCESS && (
        <p title={title} className={classNames(cls.text, {}, [cls.success, className])}>
          {children}
        </p>
      )}

      {variant === TextVariant.HELPER && (
        <p title={title} className={classNames(cls.text, {}, [cls.helper, className])}>
          {children}
        </p>
      )}
      {variant === TextVariant.SMALL && (
        <p title={title} className={classNames(cls.text, {}, [cls.small, className])}>
          {children}
        </p>
      )}
    </>
  )
}
