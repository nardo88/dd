import Head from 'next/head'
import { ReactNode } from 'react'

import { Notifications } from '@entities/Notifications'
import { getSessionData } from '@entities/User'

import { AiChatWidget } from '@features/AiChatWidget'

import { classNames } from '@shared/helpers/classNames'
import { useAppSelector } from '@shared/hooks/redux'

import { Header } from '../Header/Header'

import cls from './Layout.module.scss'

interface LayoutProps extends IProps {
  title?: string
}

interface IProps {
  children: ReactNode
}

const Content: React.FC<IProps> = ({ children }) => {
  return <div className={cls.Content}>{children}</div>
}

export const Layout: React.FC<LayoutProps> & {
  Header: React.FC
  Content: React.FC<IProps>
} = ({ children, title = 'Distant.Global' }) => {
  const { isAuth } = useAppSelector(getSessionData)
  return (
    <>
      <Head>
        <title>{title || ''}</title>
      </Head>
      <Notifications />
      {isAuth && <AiChatWidget />}
      <div className={classNames('', {}, ['df', 'fdc', 'fh'])}>{children}</div>
    </>
  )
}

Layout.Header = Header
Layout.Content = Content
