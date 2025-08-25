import { useRouter } from 'next/router'
import { type FC, MouseEvent, useState } from 'react'

import { useNotification } from '@entities/Notifications'
import dayjs from 'dayjs'

import { covers } from '@shared/consts/categories'
import { useAppDispatch } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { InfoIcon } from '@shared/ui/Icons/InfoIcon'
import { Remove } from '@shared/ui/Icons/Remove'
import { Popup } from '@shared/ui/Popup/Popup'
import { Text } from '@shared/ui/Text/Text'

import { remove } from '../../thunks/removeSandbox'
import { IData } from '../../types'

import cls from './SandboxItem.module.scss'

export const SandboxItem: FC<IData> = (props) => {
  const { _id, stack, title, updatedAt } = props
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()
  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = (e: MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  const removeHandler = () => {
    dispatch(remove({ id: _id, addNotification }))
  }

  return (
    <div className={cls.sandboxItem} onClick={() => router.push(`/sandbox/${_id}`)}>
      <div className={cls.imageWrapper}>
        <div className={cls.removeWrapper} title="Удалить" onClick={clickHandler}>
          <Remove />
        </div>
        <img src={covers[stack]} />
      </div>
      <div className={cls.bottom}>
        <Text className={cls.title} title={title}>
          {title}
        </Text>
        <Text className={cls.date}>{dayjs(updatedAt).format('DD.MM.YYYY HH:mm')}</Text>
      </div>
      {isOpen && (
        <Popup className={cls.popup} onClose={closePopup}>
          <div className={cls.popupContent}>
            <InfoIcon size={55} />
            <Text className={cls.popupText}>Вы уверены, что хотите удалить запись?</Text>
            <div className={cls.btnWrapper}>
              <Button onClick={closePopup}>Отмена</Button>
              <Button onClick={removeHandler}>Да, удалить</Button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  )
}
