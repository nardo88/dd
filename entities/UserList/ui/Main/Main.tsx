import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'

import { getCurrentPage } from '../../selectors'
import { reducer } from '../../slice'
import { FilterBlock } from '../FilterBlock/FilterBlock'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager

  const dispatch = useAppDispatch()

  const currentPage = useAppSelector(getCurrentPage)

  useEffect(() => {
    store.reducerManager.add('userList', reducer)
    dispatch({ type: 'userList' })

    return () => {
      store.reducerManager.remove('userList')
    }
  }, [store])

  useEffect(() => {
    //
  }, [currentPage])
  return (
    <div className={classNames(cls.main, {}, ['container'])}>
      <FilterBlock />
    </div>
  )
}
