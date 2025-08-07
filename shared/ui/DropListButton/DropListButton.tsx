import { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'

import { classNames } from '@shared/helpers/classNames'

import { Button } from '../Button/Button'

import cls from './DropListButton.module.scss'

export interface OptionsType {
  id: string
  title: Exclude<ReactNode, boolean | null | undefined>
  onClick: (e?: MouseEvent) => void
}

interface IDropListButtonProps {
  className?: string
  children: ReactNode
  options: OptionsType[]
  disabled?: boolean
}

export const DropListButton: FC<IDropListButtonProps> = (props) => {
  const { className, children, options, disabled = false } = props

  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const hideList = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', hideList)
    return () => {
      window.removeEventListener('click', hideList)
    }
  }, [])

  return (
    <div ref={ref} className={classNames(cls.dropListButton, {}, [className])}>
      <Button disabled={disabled} onClick={() => setIsOpen((p) => !p)} className={cls.btn}>
        {children}
      </Button>
      {isOpen && (
        <div className={cls.dropDown}>
          <ul>
            {options.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setIsOpen(false)
                  item.onClick()
                }}
                className={cls.listItem}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
