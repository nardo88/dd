import { FC, useState } from 'react'

import { useNotification } from '@entities/Notifications'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { Checkbox } from '@shared/ui/Checkbox/Checkbox'
import { Remove } from '@shared/ui/Icons/Remove'
import { Popup } from '@shared/ui/Popup/Popup'
import { Text } from '@shared/ui/Text/Text'

import { getDataList } from '../../selectors'
import { remove } from '../../thunks/remove'
import { toggleAdmin } from '../../thunks/toggleAdmin'
import { IData } from '../../types'

import cls from './TableBlock.module.scss'

const TableItem = (props: IData) => {
  const { _id, email, isAdmin } = props
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cls.row}>
      <Text>{_id}</Text>
      <Text variant="helper">{email}</Text>
      <Checkbox checked={isAdmin} onChange={() => dispatch(toggleAdmin(_id))} />
      <Remove className={cls.removeIcon} onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Popup title="Вы уверены что хотите удалить пользователя?">
          <div className={cls.btnWrapper}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => dispatch(remove({ addNotification, id: _id }))}>
              Да, удалить
            </Button>
          </div>
        </Popup>
      )}
    </div>
  )
}

export const TableBlock: FC = () => {
  const data = useAppSelector(getDataList)

  if (!data.length)
    return (
      <Text className={cls.empty} variant="helper">
        Нет данных для отображения
      </Text>
    )
  return (
    <div className={cls.tableBlock}>
      <div className={cls.row}>
        <Text variant="helper">ID</Text>
        <Text variant="helper">Email</Text>
        <Text variant="helper">Admin</Text>
        <div />
      </div>
      {data.map((item) => (
        <TableItem key={item._id} {...item} />
      ))}
    </div>
  )
}
