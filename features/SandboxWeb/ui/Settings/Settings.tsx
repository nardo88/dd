import { FC, useRef, useState } from 'react'

import { sandboxWebAction } from '@features/SandboxWeb/slice'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { Popup } from '@shared/ui/Popup/Popup'

import { getIsOpen } from '../../selectors'
import { CSSSettings } from '../CSSSettings/CSSSettings'
import { JSSettings } from '../JSSettings/JSSettings'
import { MainSettings } from '../MainSettings/MainSettings'

import cls from './Settings.module.scss'

type MenuVariant = 'css' | 'js' | 'main'

interface IMenuItem {
  id: MenuVariant
  title: string
}

const menuList: IMenuItem[] = [
  { id: 'main', title: 'Общие' },
  { id: 'js', title: 'JS' },
  { id: 'css', title: 'CSS' },
]

export const Settings: FC = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(getIsOpen)

  const [active, setActive] = useState<MenuVariant>('main')

  const closeRef = useRef<null | (() => void)>(null)

  const close = () => dispatch(sandboxWebAction.setIsOpen(false))

  if (!isOpen) return null
  return (
    <Popup
      title="Настройки"
      onClose={close}
      className={cls.settings}
      getHide={(f) => (closeRef.current = f)}
    >
      <div className={cls.wrapper}>
        <div className={cls.sidebar}>
          <ul className={cls.menuList}>
            {menuList.map((item) => (
              <li
                key={item.id}
                className={classNames(cls.menuItem, { [cls.active]: item.id === active })}
                onClick={() => setActive(item.id)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className={cls.content}>
          {active === 'main' && <MainSettings />}
          {active === 'js' && <JSSettings />}
          {active === 'css' && <CSSSettings />}
          <Button onClick={() => closeRef.current?.()} className={cls.saveBtn}>
            Сохранить
          </Button>
        </div>
      </div>
    </Popup>
  )
}
