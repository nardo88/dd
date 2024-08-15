import { FC } from 'react'
import cls from './Loader.module.scss'
import { classNames } from '@shared/helpers/classNames'

interface LoaderProps {
  className?: string
  fill?: boolean
}

export const Loader: FC<LoaderProps> = ({ className, fill = false }) => {
  return (
    <div
      className={classNames(cls.loaderWrapper, { [cls.fill]: !!fill }, [
        className,
      ])}>
      <span className={cls.loader} />
    </div>
  )
}
