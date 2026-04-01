import { FC } from 'react'

import { getFilePath } from '@shared/helpers/getFilePath'

import cls from './Video.module.scss'

interface VideoProps {
  src: string
}

export const Video: FC<VideoProps> = (props) => {
  const { src } = props

  return (
    <div className={cls.Video}>
      <video src={getFilePath(src)} controls />
    </div>
  )
}
