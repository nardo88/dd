import { FC } from 'react'

import { Button } from '@shared/ui/Button/Button'
import { HistoryICon } from '@shared/ui/Icons/HistoryICon'
import { Plus } from '@shared/ui/Icons/Plus'

import cls from './TopBlock.module.scss'

export const TopBlock: FC = () => {
  return (
    <div className={cls.topBlock}>
      <Button className={cls.btn}>
        <Plus />
      </Button>
      <Button className={cls.btn}>
        <HistoryICon className={cls.history} />
      </Button>
    </div>
  )
}
