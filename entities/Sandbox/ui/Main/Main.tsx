import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Loader } from '@shared/ui/Loader/Loader'
import Pagination from '@shared/ui/Pagination/Pagination'
import { Text, TextVariant } from '@shared/ui/Text/Text'

import { PAGE_COUNT } from '../../consts'
import { getCurrentPage, getError, getFilter, getIsLoading, getTotal } from '../../selectors'
import { sandboxListAction, sandboxListReducer } from '../../slice'
import { getSandboxList } from '../../thunks/getSandboxList'
import { FilterBlock } from '../FilterBlock/FilterBlock'
import { Table } from '../Table/Table'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const error = useAppSelector(getError)
  const currentPage = useAppSelector(getCurrentPage)
  const total = useAppSelector(getTotal)
  const filter = useAppSelector(getFilter)
  const isLoading = useAppSelector(getIsLoading)

  useEffect(() => {
    store.reducerManager.add('sandboxList', sandboxListReducer)
    dispatch({ type: 'sandboxList' })

    return () => {
      store.reducerManager.remove('sandboxList')
    }
  }, [store])

  useEffect(() => {
    dispatch(getSandboxList())
  }, [currentPage, filter])

  return (
    <div className={cls.main}>
      {error && <Text variant={TextVariant.ERROR}>{error}</Text>}
      {isLoading && <Loader fill className={cls.spinner} />}
      <FilterBlock />
      <Table />
      <Pagination
        currentPage={currentPage}
        onChange={(v) => dispatch(sandboxListAction.setCurrentPage(v))}
        total={total}
        pageCount={PAGE_COUNT}
      />
    </div>
  )
}
