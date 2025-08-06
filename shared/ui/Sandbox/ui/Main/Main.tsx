import { FC } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { LanguageVariants } from '@shared/types/body'

import { JavaScript } from '../JavaScript/JavaScript'
import { Php } from '../Php/Php'
import Python from '../Python/Python'
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
      {language === 'python' && <Python {...props} />}
      {language === 'php' && <Php {...props} />}
    </div>
  )
}
