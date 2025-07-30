import { FC } from 'react'

import { useAppSelector } from '@shared/hooks/redux'
import { Sandbox } from '@shared/ui/Sandbox'

import { getLanguage } from '../../selectors'

import cls from './Content.module.scss'

export const Content: FC = () => {
  const language = useAppSelector(getLanguage)
  return (
    <div className={cls.content}>
      <Sandbox language={language} canRun />
    </div>
  )
}
