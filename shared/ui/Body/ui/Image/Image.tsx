import { FC } from 'react'
import cls from './Image.module.scss'

interface ImageProps {
  src: string
}

export const Image: FC<ImageProps> = (props) => {
  const { src } = props

  return (
    <div className={cls.imgWrapper}>
      <img src={src} className={cls.img} />
    </div>
  )
}
