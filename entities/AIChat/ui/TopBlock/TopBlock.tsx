import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { HistoryICon } from '@shared/ui/Icons/HistoryICon'
import { Plus } from '@shared/ui/Icons/Plus'

import { addSession } from '../../modules/asyncThunks/addSession'
import { getMessages } from '../../modules/selectors'

import cls from './TopBlock.module.scss'

export const TopBlock: FC = () => {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getMessages)

  const adSession = () => {
    dispatch(addSession())
  }

  const openHistory = () => {
    //
  }

  return (
    <div className={cls.topBlock}>
      <Button className={cls.btn} onClick={adSession} disabled={!messages.length}>
        <Plus />
      </Button>
      <Button className={cls.btn} onClick={openHistory}>
        <HistoryICon className={cls.history} />
      </Button>
    </div>
  )
}
