import { FC, ReactNode } from 'react'
import cls from './Text.module.scss'
import { classNames } from '@shared/helpers/classNames'

export enum TextVariant {
  TEXT = 'text',
  SMALL = 'small',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  ERROR = 'error',
  SUCCESS = 'success',
  HELPER = 'helper',
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
