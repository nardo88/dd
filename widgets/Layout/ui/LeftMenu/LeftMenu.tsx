import { FC, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

import cls from './LeftMenu.module.scss'
import { ProfileIcon } from '@shared/ui/Icons/Profile'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getSessionData, sessionAction } from '@entities/User'
import { useRouter } from 'next/router'

export const LeftMenu: FC = () => {
  const { isAuth, isLoad, userData } = useAppSelector(getSessionData)
  const { push } = useRouter()
  const roles = userData?.roles
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLUListElement>(null)
  const closeMenu = () => setIsOpen(false)

  const menuItems = useMemo(() => {
    const menu = [
      {
        id: 'profile',
        click: () => push('/profile'),
        title: 'Профиль',
      },
      {
        id: 'logout',
        click: () => dispatch(sessionAction.logout()),
        title: 'Выйти',
      },
    ]

    if (roles?.includes('admin')) {
      menu.splice(
        1,
        0,
        {
          id: 'conspect_manager',
          click: () => push('/articles'),
          title: 'Управление конспектами',
        },
        {
          id: 'roles',
          click: () => push('/roles'),
          title: 'Роли',
        },
        {
          id: 'editor',
          click: () => push('/editor'),
          title: 'Создать конспект',
        }
      )
    }

    return menu
  }, [userData?.roles])

  const hideMenu = (e: any) => {
    if (isAuth && ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', hideMenu)

    return () => document.removeEventListener('click', hideMenu)
  }, [])

  if (isLoad) return null

  return (
    <div className={cls.leftMenu}>
      {!isAuth ? (
        <Link href={'/signin'} className={cls.signin}>
          Войти
        </Link>
      ) : (
        <div className={cls.menu} onClick={(e) => e.stopPropagation()}>
          <ProfileIcon className={cls.profileIcon} onClick={() => setIsOpen((p) => !p)} />
          {isOpen && (
            <ul className={cls.Wrapper} ref={ref}>
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={cls.menuItem}
                  onClick={() => {
                    item.click()
                    closeMenu()
                  }}>
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
