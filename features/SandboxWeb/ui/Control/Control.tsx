import { useRouter } from 'next/router'
import { FC } from 'react'

import { sandboxWebAction } from '@features/SandboxWeb/slice'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { SettingIcon } from '@shared/ui/Icons/SettingIcon'

import cls from './Control.module.scss'

export const Control: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const goBack = () => {
    router.push('/sandbox-list')
  }

  const settingHandler = () => {
    dispatch(sandboxWebAction.setIsOpen(true))
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
        <Button className={cls.btn}>Сохранить</Button>
      </div>
    </div>
  )
}
