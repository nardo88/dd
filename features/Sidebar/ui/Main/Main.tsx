import { FC, useEffect, useRef } from 'react'
import { Burger } from '@shared/ui/Burger/Burger'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { sidebarReducer, sidebarAction } from '../../modules/slice'
import { classNames } from '@shared/helpers/classNames'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { getIsOpenSidebar } from '../../modules/selectors'
import cls from './Main.module.scss'
import { preview } from '../../modules/async/preview'
import { PreviewList } from '../PreviewList/PreviewList'

export const Sidebar: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const ref = useRef<HTMLDivElement>(null)
  const isOpen = useAppSelector(getIsOpenSidebar)
  const dispatch = useAppDispatch()

  const toggleIsOpen = () => dispatch(sidebarAction.toggleSidebar(!isOpen))

  useEffect(() => {
    const hideSidebar = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.stopPropagation()
        dispatch(sidebarAction.toggleSidebar(false))
      }
    }

    window.addEventListener('click', hideSidebar)

    return () => {
      window.removeEventListener('click', hideSidebar)
    }
  }, [])

  useEffect(() => {
    store.reducerManager.add('sidebar', sidebarReducer)
    return () => {
      store.reducerManager.remove('sidebar')
    }
  }, [store])

  useEffect(() => {
    dispatch(preview())
  }, [])

  return (
    <div className={classNames(cls.Sidebar, { [cls.open]: isOpen })} ref={ref}>
      <div className={cls.burgerWrapper}>
        <Burger onClick={toggleIsOpen} isOpen={isOpen} />
      </div>
      <PreviewList />
    </div>
  )
}
