import { FC } from 'react'
import cls from './Footer.module.scss'
import { classNames } from '@shared/helpers/classNames'

interface Footer {
  className?: string
}

export const Footer: FC<Footer> = ({ className }) => {
  return (
    <footer className={classNames(cls.footer, {}, [className])}>Footer</footer>
  )
}
