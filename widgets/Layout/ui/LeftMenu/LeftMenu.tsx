import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import cls from './LeftMenu.module.scss'
import { ProfileIcon } from '@shared/ui/Icons/Profile'
import { useAppDispatch } from '@shared/hooks/redux'
import { sessionAction } from '@entities/User'

interface LeftMenuProps {
  isAuth: boolean
  isLoad: boolean
}

export const LeftMenu: FC<LeftMenuProps> = ({ isAuth, isLoad }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispath = useAppDispatch()
  const ref = useRef<HTMLUListElement>(null)
  const closeMenu = () => setIsOpen(false)

  const menuItems = [
    {
      id: 'logOut',
      click: () => dispath(sessionAction.logout()),
      title: 'Выйти',
    },
  ]

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
          <ProfileIcon
            className={cls.profileIcon}
            onClick={() => setIsOpen((p) => !p)}
          />
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
