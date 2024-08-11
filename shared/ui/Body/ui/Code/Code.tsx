import { FC } from 'react'
import cls from './Code.module.scss'

interface CodeProps {
  value: string
}

export const Code: FC<CodeProps> = (props) => {
  const { value } = props

  return <div className={cls.Code}></div>
}
