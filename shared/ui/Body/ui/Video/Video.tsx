import { FC } from 'react'
import cls from './Video.module.scss'

interface VideoProps {
  src: string
}

export const Video: FC<VideoProps> = (props) => {
  const { src } = props

  return (
    <div className={cls.Video}>
      <video src={src} controls />
    </div>
  )
}
