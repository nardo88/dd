import { classNames } from '@shared/helpers/classNames'
import { FC } from 'react'
import cls from './Burger.module.scss'

interface BurgerProps {
  isOpen: boolean
  onClick: () => void
  color?: 'light' | 'dark'
}

export const Burger: FC<BurgerProps> = (props) => {
  const { color = 'light', isOpen, onClick } = props
  return (
    <button
      onClick={onClick}
      className={classNames(cls.burger, { [cls.opened]: isOpen }, [
        cls[color],
      ])}>
      <span />
    </button>
  )
}
