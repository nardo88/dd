import { FC } from 'react'
import cls from './LoadComponent.module.scss'
import { Loader } from '../Loader/Loader'
import { classNames } from '@shared/helpers/classNames'

interface LoadComponentProps {
  className?: string
}

export const LoadComponent: FC<LoadComponentProps> = ({ className }) => {
  return (
    <div className={classNames(cls.LoadComponent, {}, [className])}>
      <Loader />
    </div>
  )
}
