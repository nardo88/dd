import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Loader } from '@shared/ui/Loader/Loader'
import Pagination from '@shared/ui/Pagination/Pagination'
import { Text } from '@shared/ui/Text/Text'

import { PAGE_COUNT } from '../../consts'
import { getCurrentPage, getError, getFilter, getIsLoading, getTotal } from '../../selectors'
import { actions, reducer } from '../../slice'
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
  const total = useAppSelector(getTotal)
  const error = useAppSelector(getError)

  const changePage = (val: number) => {
    dispatch(actions.setCurrentPage(val))
  }

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
      {error && <Text variant="error">{error}</Text>}
      <FilterBlock />
      <TableBlock />
      <Pagination
        currentPage={currentPage}
        onChange={changePage}
        total={total}
        pageCount={PAGE_COUNT}
      />
    </div>
  )
}
