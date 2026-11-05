import { FC, MouseEvent, useState } from 'react'

import dayjs from 'dayjs'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { Remove } from '@shared/ui/Icons/Remove'
import { Popup } from '@shared/ui/Popup/Popup'
import { Text } from '@shared/ui/Text/Text'

import { deleteSession } from '../../modules/asyncThunks/deleteSession'
import { getSessionId } from '../../modules/selectors'
import { actions } from '../../modules/slice'
import { IAISessions } from '../../types'

import cls from './SessionItem.module.scss'

interface IProps {
  session: IAISessions
  onSelect: () => void
}

export const SessionItem: FC<IProps> = (props) => {
  const { session, onSelect } = props
  const { _id, createdAt, message } = session

  const dispatch = useAppDispatch()
  const sessionId = useAppSelector(getSessionId)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const isActive = sessionId === _id
  const createdDate = createdAt < 1e12 ? dayjs.unix(createdAt) : dayjs(createdAt)

  const selectHandler = () => {
    if (isActive) return
    dispatch(actions.setSession(_id))
    onSelect()
  }

  const openDeletePopup = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsDeleteOpen(true)
  }

  const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(deleteSession({ id: _id }))
    setIsDeleteOpen(false)
  }

  return (
    <li className={classNames(cls.item, { [cls.active]: isActive })} onClick={selectHandler}>
      <div className={cls.info}>
        <Text className={cls.message} title={message}>
          {message || 'Пустая сессия'}
        </Text>
        <Text variant="small" className={cls.date}>
          {createdDate.format('DD.MM.YYYY HH:mm')}
        </Text>
      </div>

      {!isActive && (
        <Button variant="icon" className={cls.remove} onClick={openDeletePopup}>
          <Remove />
        </Button>
      )}

      {isDeleteOpen && (
        <Popup
          title="Вы уверены что хотите удалить сессию?"
          onClose={() => setIsDeleteOpen(false)}
          maxWidth={400}
        >
          <div className={cls.popupContent}>
            <div className={cls.btnWrapper}>
              <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>
                Отмена
              </Button>
              <Button onClick={deleteHandler}>Да, удалить</Button>
            </div>
          </div>
        </Popup>
      )}
    </li>
  )
}
