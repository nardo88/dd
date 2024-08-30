import { FC } from 'react'
import { IContainerProps } from '../../types'
import { classNames } from '../../../../helpers/classNames'
import cls from './Container.module.scss'

export const Container: FC<IContainerProps> = (props) => {
  const { children, className } = props
  return <div className={classNames(cls.container, {}, [className])}>{children}</div>
}
