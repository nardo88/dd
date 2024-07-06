import { FC, useEffect } from 'react'
import cls from './Header.module.scss'
import { Logo } from '@shared/ui/Icons/Logo'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getSession, getSessionData } from '@entities/User'
import { LeftMenu } from '../LeftMenu/LeftMenu'
import Link from 'next/link'

export const Header: FC = () => {
  const dispatch = useAppDispatch()
  const { isReady } = useAppSelector(getSessionData)

  useEffect(() => {
    if (!isReady) {
      dispatch(getSession())
    }
  }, [dispatch, isReady])

  return (
    <header className={cls.header}>
      <div className={cls.wrapper}>
        <Link href="/">
          <Logo />
        </Link>
        {isReady && <LeftMenu />}
      </div>
    </header>
  )
}
