import { FC, useState } from 'react'

import { useNotification } from '@entities/Notifications'
import dayjs from 'dayjs'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { CloseIcon } from '@shared/ui/Icons/CloseIcon'
import { InfoIcon } from '@shared/ui/Icons/InfoIcon'
import { Popup } from '@shared/ui/Popup/Popup'
import { Text } from '@shared/ui/Text/Text'

import { getData } from '../../selectors'
import { deleteSession } from '../../thunks/deleteSession'
import { DataType } from '../../types'

import cls from './TableData.module.scss'

interface IProps extends DataType {}

const Session: FC<IProps> = (props) => {
  const { _id, createdAt, ip, os, ttl } = props
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className={cls.row}>
      <Text className={classNames(cls.column, {}, [cls.system])}>{os}</Text>
      <Text className={classNames(cls.column, {}, [cls.ip])}>{ip}</Text>
      <Text className={classNames(cls.column, {}, [cls.created])}>
        {dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
      </Text>
      <Text
        className={classNames(cls.column, {}, [
          cls.ttl,
          dayjs().isBefore(dayjs(ttl)) ? cls.active : cls.inactive,
        ])}
      >
        {dayjs(ttl).format('DD.MM.YYYY HH:mm')}
      </Text>
      <div className={classNames(cls.column, {}, [cls.control])}>
        <Button variant="icon" className={cls.close} onClick={() => setIsOpen(true)}>
          <CloseIcon />
        </Button>
      </div>
      {isOpen && (
        <Popup
          className={cls.popup}
          title="Вы уверены что хотите удалить сессию?"
          onClose={() => setIsOpen(false)}
        >
          <div className={cls.popupContent}>
            <InfoIcon className={cls.infoIcon} />
            <div className={cls.btnWrapper}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => dispatch(deleteSession({ addNotification, id: _id }))}>
                Да, удалить
              </Button>
            </div>
          </div>
        </Popup>
      )}
    </li>
  )
}

export const TableData: FC = () => {
  const data = useAppSelector(getData)

  if (!data.length)
    return (
      <Text variant="helper" className={cls.empty}>
        Нет данных для отображения
      </Text>
    )

  return (
    <ul className={cls.tableData}>
      <li className={cls.row}>
        <Text variant="helper" className={classNames(cls.column, {}, [cls.system])}>
          Система
        </Text>
        <Text variant="helper" className={classNames(cls.column, {}, [cls.ip])}>
          IP адрес
        </Text>
        <Text variant="helper" className={classNames(cls.column, {}, [cls.created])}>
          Дата создания
        </Text>
        <Text variant="helper" className={classNames(cls.column, {}, [cls.ttl])}>
          Срок действия
        </Text>
        <div className={classNames(cls.column, {}, [cls.control])} />
      </li>
      {data.map((item) => (
        <Session key={item._id} {...item} />
      ))}
    </ul>
  )
}
