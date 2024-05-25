import Head from 'next/head'
import { Header } from '../Header/Header'
import cls from './Layout.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { ReactNode } from 'react'

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
  return (
    <>
      <Head>
        <title>{title || ''}</title>
      </Head>
      <div className={classNames('', {}, ['df', 'fdc', 'fh'])}>{children}</div>
    </>
  )
}

Layout.Header = Header
Layout.Content = Content
