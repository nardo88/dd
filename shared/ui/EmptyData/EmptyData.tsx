import { type FC } from 'react'

import { classNames } from '@shared/helpers/classNames'
import Icon404 from '@shared/ui/Icons/Icon404'
import { Text } from '@shared/ui/Text/Text'

import cls from './EmptyData.module.scss'

interface IEmptyDataProps {
  className?: string
  title?: string
}

export const EmptyData: FC<IEmptyDataProps> = (props) => {
  const { className, title } = props

  return (
    <div className={classNames(cls.emptyData, {}, [className])}>
      <Icon404 className={cls.icon} />
      <Text className={cls.title}>{title || 'Нет данных для отображения'}</Text>
    </div>
  )
}
