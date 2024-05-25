import { FC, useEffect, useRef } from 'react'
import cls from './Sidebar.module.scss'
import { Burger } from '@shared/ui/Burger/Burger'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getIsOpenSidebar } from '../../modules/selectors'
import { catalogAction } from '../../modules/slice'
import { classNames } from '@shared/helpers/classNames'

export const Sidebar: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isOpen = useAppSelector(getIsOpenSidebar)
  const dispatch = useAppDispatch()

  const togleIsOpen = () => dispatch(catalogAction.toggleSidebar(!isOpen))

  useEffect(() => {
    const hideSidebar = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.stopPropagation()
        dispatch(catalogAction.toggleSidebar(false))
      }
    }

    window.addEventListener('click', hideSidebar)

    return () => {
      window.removeEventListener('click', hideSidebar)
    }
  }, [])

  return (
    <div className={classNames(cls.Sidebar, { [cls.open]: isOpen })} ref={ref}>
      <div className={cls.burgerWrapper}>
        <Burger onClick={togleIsOpen} isOpen={isOpen} />
      </div>
    </div>
  )
}
