import { FC } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { Stacks } from '@shared/types/sandbox'

import { JavaScript } from '../JavaScript/JavaScript'
import { Php } from '../Php/Php'
import Python from '../Python/Python'
import { TypeScript } from '../TypeScript/TypeScript'
import { Web } from '../Web/Web'

import cls from './Main.module.scss'

interface IMainProps {
  className?: string
  language: Stacks
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
      {language === 'web' && <Web {...props} />}
    </div>
  )
}
