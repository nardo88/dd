import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Loader } from '@shared/ui/Loader/Loader'

import { getCurrentPage, getFilter, getIsLoading } from '../../selectors'
import { reducer } from '../../slice'
import { getData } from '../../thunks/getData'
import { FilterBlock } from '../FilterBlock/FilterBlock'
import { TableBlock } from '../TableBlock/TableBlock'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager

  const dispatch = useAppDispatch()

  const currentPage = useAppSelector(getCurrentPage)
  const filter = useAppSelector(getFilter)
  const isLoading = useAppSelector(getIsLoading)

  useEffect(() => {
    store.reducerManager.add('userList', reducer)
    dispatch({ type: 'userList' })

    return () => {
      store.reducerManager.remove('userList')
    }
  }, [store])

  useEffect(() => {
    dispatch(getData())
  }, [currentPage, filter])
  return (
    <div className={classNames(cls.main, {}, ['container'])}>
      {isLoading && <Loader className={cls.spinner} />}
      <FilterBlock />
      <TableBlock />
    </div>
  )
}
