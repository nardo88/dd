import { FC } from 'react'
import cls from './Loader.module.scss'
import { classNames } from '@shared/helpers/classNames'

export enum LoaderVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface LoaderProps {
  className?: string
  fill?: boolean
  variant?: LoaderVariants
}

export const Loader: FC<LoaderProps> = ({
  className,
  fill = false,
  variant = LoaderVariants.PRIMARY,
}) => {
  return (
    <div className={classNames(cls.loaderWrapper, { [cls.fill]: !!fill }, [className])}>
      <span className={classNames(cls.loader, {}, [cls[variant]])} />
    </div>
  )
}
