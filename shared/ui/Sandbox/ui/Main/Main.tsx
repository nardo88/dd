import { FC } from 'react'
import { classNames } from '@shared/helpers/classNames'
import { LanguageVariants } from '@shared/types/body'

import cls from './Main.module.scss'
import { TypeScript } from '../TypeScript/TypeScript'

interface IMainProps {
  className?: string
  language: LanguageVariants
  code?: string
  canRun?: boolean
}

export const Main: FC<IMainProps> = (props) => {
  const { className, language } = props

  return (
    <div className={classNames(cls.main, {}, [className])}>
      {language === 'typescript' && <TypeScript {...props} />}
    </div>
  )
}
