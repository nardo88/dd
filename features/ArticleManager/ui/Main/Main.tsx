import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { FilterBlock } from '../FilterBlock/FilterBlock'
import { TableBlock } from '../TableBlock/TableBlock'
import { articleManagerReducer } from '../../slice'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getCategoryFilter, getCurrentPage, getIsLoading, getTitleFilter } from '../../selectors'
import { getArticleList } from '../../asyncThunk/getArticleList'
import cls from './Main.module.scss'
import { Loader } from '@shared/ui/Loader/Loader'

export const Main: FC = () => {
  const dispatch = useAppDispatch()
  const store = useStore() as ReduxStoreWithManager
  const title = useAppSelector(getTitleFilter)
  const page = useAppSelector(getCurrentPage)
  const category = useAppSelector(getCategoryFilter)
  const isLoading = useAppSelector(getIsLoading)

  useEffect(() => {
    store.reducerManager.add('articleManager', articleManagerReducer)
    return () => {
      store.reducerManager.remove('articleManager')
    }
  }, [store])

  useEffect(() => {
    dispatch(
      getArticleList({
        title,
        page,
        category: category?.id || '',
      })
    )
  }, [page, category, title])

  return (
    <div className={cls.Main}>
      {isLoading && <Loader className={cls.loader} />}
      <FilterBlock />
      <TableBlock />
    </div>
  )
}
