import { FC } from 'react'

import cls from './Table.module.scss'

interface ITableProps {
  className?: string
}

export const Table: FC<ITableProps> = (props) => {
  const { className } = props

  return <div className={cls.table}></div>
}
