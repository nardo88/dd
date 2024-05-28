import { FC } from 'react'
import cls from './Loader.module.scss'
import { classNames } from '@shared/helpers/classNames'

interface LoaderProps {
  className?: string
}

export const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={classNames(cls.loaderWrapper, {}, [className])}>
      <span className={cls.loader} />
    </div>
  )
}
