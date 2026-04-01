import { FC } from 'react'

import { getFilePath } from '@shared/helpers/getFilePath'

import cls from './Image.module.scss'

interface ImageProps {
  src: string
}

export const Image: FC<ImageProps> = (props) => {
  const { src } = props

  return (
    <div className={cls.imgWrapper}>
      <img src={getFilePath(src)} className={cls.img} />
    </div>
  )
}
