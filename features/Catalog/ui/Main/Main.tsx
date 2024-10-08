import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'
import { FilterBlock } from '../FilterBlock/FilterBlock'
import { catalogAction, catalogReducer } from '../../modules/slice'
import cls from './Main.module.scss'
import { ReduxStoreWithManager } from '@app/redux'
import { Articles } from '../Articles/Articles'
import Pagination from '@shared/ui/Pagination/Pagination'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import {
  getCurrentPage,
  getError,
  getIsLoading,
  getTitleFilterValue,
  getTotal,
} from '../../modules/selectors'
import { getArticles } from '../../modules/asyncThunk/getArticles'
import { Loader } from '@shared/ui/Loader/Loader'
import { Sidebar } from '@features/Sidebar'
import { Text, TextVariant } from '@shared/ui/Text/Text'

const PAGE_COUNT = 12

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const total = useAppSelector(getTotal)
  const currentPage = useAppSelector(getCurrentPage)
  const isLoading = useAppSelector(getIsLoading)
  const filter = useAppSelector(getTitleFilterValue)
  const error = useAppSelector(getError)

  const changeCurrentPage = (v: number) => dispatch(catalogAction.setCurrentPage(v))

  useEffect(() => {
    store.reducerManager.add('catalog', catalogReducer)
    return () => {
      store.reducerManager.remove('catalog')
    }
  }, [store])

  useEffect(() => {
    dispatch(getArticles({ currentPage, pageCount: PAGE_COUNT, filter }))
  }, [currentPage, filter])

  return (
    <div className={cls.Main}>
      <Sidebar />
      <div className={cls.content}>
        {isLoading && <Loader className={cls.loader} />}
        {error && (
          <Text className={cls.error} variant={TextVariant.ERROR}>
            {error}
          </Text>
        )}
        <FilterBlock />
        <Articles />
        <Pagination
          currentPage={currentPage}
          onChange={changeCurrentPage}
          total={total}
          pageCount={PAGE_COUNT}
        />
      </div>
    </div>
  )
}
