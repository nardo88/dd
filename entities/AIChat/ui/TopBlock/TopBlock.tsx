import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { CloseIcon } from '@shared/ui/Icons/CloseIcon'
import { HistoryICon } from '@shared/ui/Icons/HistoryICon'
import { Plus } from '@shared/ui/Icons/Plus'

import { addSession } from '../../modules/asyncThunks/addSession'
import { getMessages } from '../../modules/selectors'

import cls from './TopBlock.module.scss'

interface IProps {
  onOpenHistory: () => void
  close: () => void
}

export const TopBlock: FC<IProps> = (props) => {
  const { onOpenHistory, close } = props
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getMessages)

  const adSession = () => {
    dispatch(addSession())
  }

  return (
    <div className={cls.topBlock}>
      <Button className={cls.btn} onClick={adSession} disabled={!messages.length}>
        <Plus />
      </Button>
      <Button className={cls.btn} onClick={onOpenHistory}>
        <HistoryICon className={cls.history} />
      </Button>
      <Button className={cls.btn} onClick={close}>
        <CloseIcon className={cls.history} />
      </Button>
    </div>
  )
}
