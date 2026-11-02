import { FC } from 'react'

import { classNames } from '@shared/helpers/classNames'

import { IMainProps } from '../../types'
import { JavaScript } from '../JavaScript/JavaScript'
import { Php } from '../Php/Php'
import Python from '../Python/Python'
import { TypeScript } from '../TypeScript/TypeScript'

import cls from './Main.module.scss'

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
