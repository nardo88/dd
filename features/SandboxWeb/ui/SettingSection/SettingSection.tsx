import { FC, ReactNode } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { Text } from '@shared/ui/Text/Text'

import cls from './SettingSection.module.scss'

interface ISettingSectionProps {
  className?: string
  title: string
  children: ReactNode
}

export const SettingSection: FC<ISettingSectionProps> = (props) => {
  const { className, children, title } = props

  return (
    <div className={classNames(cls.settingsSection, {}, [className])}>
      <Text className={cls.title}>{title}</Text>
      {children}
    </div>
  )
}
