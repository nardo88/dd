import { FC } from 'react'
import cls from './Progress.module.scss'
import { classNames } from '@shared/helpers/classNames'

interface ProgressProps {
  className?: string
  progress: number
}

export const Progress: FC<ProgressProps> = (props) => {
  const { className, progress } = props

  return (
    <div className={classNames(cls.Progress, {}, [className])}>
      <div className={cls.progressLine}>
        <span>{`${progress}%`}</span>
        <div className={cls.progressValue} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
