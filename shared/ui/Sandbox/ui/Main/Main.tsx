import { FC } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { LanguageVariants } from '@shared/types/body'

import { JavaScript } from '../JavaScript/JavaScript'
import { TypeScript } from '../TypeScript/TypeScript'

import cls from './Main.module.scss'

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
      {language === 'javascript' && <JavaScript {...props} />}
    </div>
  )
}
