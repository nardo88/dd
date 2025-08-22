import { FC } from 'react'

import { useAppSelector } from '@shared/hooks/redux'
import { EmptyData } from '@shared/ui/EmptyData/EmptyData'

import { getData, getIsLoading } from '../../selectors'
import { SandboxItem } from '../SandboxItem/SandboxItem'

import cls from './Table.module.scss'

export const Table: FC = () => {
  const data = useAppSelector(getData)
  const isLoading = useAppSelector(getIsLoading)
  return (
    <div className={cls.table}>
      {!isLoading && !data.length && <EmptyData />}
      {!!data.length && (
        <div className={cls.list}>
          {data.map((item) => (
            <SandboxItem key={item._id} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}
