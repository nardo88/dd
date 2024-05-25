import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'
import { FilterBlock } from '../FilterBlock/FilterBlock'
import { catalogAction, catalogReducer } from '../../modules/slice'
import cls from './Main.module.scss'
import { ReduxStoreWithManager } from '@app/redux'
import { Sidebar } from '../Sidebar/Sidebar'
import { Articles } from '../Articles/Articles'
import Pagination from '@shared/ui/Pagination/Pagination'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getCurentPage, getTotal } from '../../modules/selectors'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const total = useAppSelector(getTotal)
  const curentPage = useAppSelector(getCurentPage)

  const changeCurentPage = (v: number) =>
    dispatch(catalogAction.setCurentPage(v))

  useEffect(() => {
    store.reducerManager.add('catalog', catalogReducer)
    return () => {
      store.reducerManager.remove('catalog')
    }
  }, [store])

  return (
    <div className={cls.Main}>
      <Sidebar />
      <div className={cls.content}>
        <FilterBlock />
        <Articles />
        <Pagination
          currentPage={curentPage}
          onChange={changeCurentPage}
          total={total}
        />
      </div>
    </div>
  )
}
