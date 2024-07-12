import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { FilterBlock } from '../FilterBlock/FilterBlock'
import { TableBlock } from '../TableBlock/TableBlock'
import { articleManagerAction, articleManagerReducer } from '../../slice'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import {
  getCategoryFilter,
  getCurrentPage,
  getTitleFilter,
  getTotal,
} from '../../selectors'
import { getArticleList } from '../../asyncThunk/getArticleList'
import cls from './Main.module.scss'
import Pagination from '@shared/ui/Pagination/Pagination'

interface MainProps {
  className?: string
}

export const Main: FC = () => {
  const dispatch = useAppDispatch()
  const store = useStore() as ReduxStoreWithManager
  const title = useAppSelector(getTitleFilter)
  const page = useAppSelector(getCurrentPage)
  const category = useAppSelector(getCategoryFilter)

  useEffect(() => {
    dispatch(
      getArticleList({
        title,
        page,
        category: category?.id || '',
      })
    )
  }, [page, category, title])

  useEffect(() => {
    store.reducerManager.add('articleManager', articleManagerReducer)
    return () => {
      store.reducerManager.remove('articleManager')
    }
  }, [store])

  return (
    <div className={cls.Main}>
      <FilterBlock />
      <TableBlock />
    </div>
  )
}
