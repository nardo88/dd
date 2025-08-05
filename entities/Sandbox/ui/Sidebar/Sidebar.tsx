import { FC } from 'react'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button, ButtonVariant } from '@shared/ui/Button/Button'
import { ArrowBottom } from '@shared/ui/Icons/ArrowBottom'

import { links } from '../../consts'
import { getIsOpen, getLanguage } from '../../selectors'
import { sandboxAction } from '../../slice'

import cls from './Sidebar.module.scss'

export const Sidebar: FC = () => {
  const isOpen = useAppSelector(getIsOpen)

  const language = useAppSelector(getLanguage)
  const dispatch = useAppDispatch()

  const toggleHandler = () => {
    dispatch(sandboxAction.toggleSidebar())
  }
  return (
    <div className={classNames(cls.sidebar, { [cls.opened]: isOpen })}>
      <div className={cls.top}>
        <Button className={cls.toggleBtn} variant={ButtonVariant.ICON} onClick={toggleHandler}>
          <ArrowBottom className={classNames(cls.icon, { [cls.openIcon]: isOpen })} />
        </Button>
      </div>
      <ul className={classNames(cls.linkWrapper, { [cls.isVisible]: isOpen })}>
        {links.map((item) => (
          <li
            key={item.path}
            onClick={() => dispatch(sandboxAction.setLanguage(item.path))}
            className={classNames(cls.linkItem, { [cls.active]: language === item.path })}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
