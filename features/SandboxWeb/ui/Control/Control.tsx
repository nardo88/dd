import { useRouter } from 'next/router'
import { FC } from 'react'

import { useNotification } from '@entities/Notifications'

import { sandboxWebAction } from '@features/SandboxWeb/slice'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { SettingIcon } from '@shared/ui/Icons/SettingIcon'

import { create } from '../../thunks/createSandbox'

import cls from './Control.module.scss'

interface IControlProps {
  id?: string
}

export const Control: FC<IControlProps> = ({ id }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const goBack = () => {
    router.push('/sandbox-list')
  }

  const settingHandler = () => {
    dispatch(sandboxWebAction.setIsOpen(true))
  }

  const saveHandler = () => {
    if (id) {
      console.log()
    } else {
      dispatch(
        create({
          addNotification,
          callback: (id: string) => {
            addNotification({
              message: 'Данные успешно сохранены',
              type: 'success',
              delay: 3000,
            })
            router.push(`/sandbox/${id}`)
          },
        })
      )
    }
  }

  return (
    <div className={cls.control}>
      <Button className={cls.btn} onClick={goBack}>
        Назад
      </Button>
      <div className={cls.rightSide}>
        <Button onClick={settingHandler} className={classNames(cls.btn, {}, [cls.setting])}>
          <SettingIcon />
        </Button>
        <Button onClick={saveHandler} className={cls.btn}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
