import { FC } from 'react'

import { useAppSelector } from '@shared/hooks/redux'
import { Text } from '@shared/ui/Text/Text'

import { getData } from '../../selectors'

import cls from './TableData.module.scss'

interface IProps {
  className?: string
}

export const TableData: FC = () => {
  const data = useAppSelector(getData)

  if (!data.length)
    return (
      <Text variant="helper" className={cls.empty}>
        Нет данных для отображения
      </Text>
    )

  return <div className={cls.tableData}></div>
}
