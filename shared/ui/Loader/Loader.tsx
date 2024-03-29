import { FC } from 'react'
import cls from './Loader.module.scss'

interface LoaderProps {
  className?: string
}

export const Loader: FC<LoaderProps> = ({ className }) => {
  return <span className={cls.loader} />
}
