import { FC, useEffect } from 'react'
import cls from './Header.module.scss'
import { Logo } from '@shared/ui/Icons/Logo'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getSession, getSessionData } from '@entities/User'
import { LeftMenu } from '../LeftMenu/LeftMenu'

export const Header: FC = () => {
  const dispatch = useAppDispatch()
  const { isReady, isAuth, isLoad } = useAppSelector(getSessionData)

  useEffect(() => {
    if (!isReady) {
      dispatch(getSession())
    }
  }, [dispatch, isReady])

  if (!isReady) return null

  return (
    <header className={cls.header}>
      <div className={cls.wrapper}>
        <Logo />
        <LeftMenu isAuth={isAuth} isLoad={isLoad} />
      </div>
    </header>
  )
}
