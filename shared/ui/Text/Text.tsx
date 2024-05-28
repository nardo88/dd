import { FC, ReactNode } from 'react'
import cls from './Text.module.scss'
import { classNames } from '@shared/helpers/classNames'

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
}

export const Text: FC<TextProps> = (props) => {
  const { className, variant = TextVariant.TEXT, children } = props
  return (
    <>
      {variant === TextVariant.TEXT && (
        <p className={classNames(cls.text, {}, [className])}>{children}</p>
      )}
      {variant === TextVariant.ERROR && (
        <p className={classNames(cls.text, {}, [cls.error, className])}>
          {children}
        </p>
      )}
      {variant === TextVariant.SUCCESS && (
        <p className={classNames(cls.text, {}, [cls.success, className])}>
          {children}
        </p>
      )}

      {variant === TextVariant.HELPER && (
        <p className={classNames(cls.text, {}, [cls.helper, className])}>
          {children}
        </p>
      )}
      {variant === TextVariant.SMALL && (
        <p className={classNames(cls.text, {}, [cls.small, className])}>
          {children}
        </p>
      )}
    </>
  )
}
