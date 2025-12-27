import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import Pagination from '@shared/ui/Pagination/Pagination'
import { Text } from '@shared/ui/Text/Text'

import { PAGE_COUNT } from '../../consts'
import { getCurrentPage, getTotal } from '../../selectors'
import { actions, reducer } from '../../slice'
import { getSessionList } from '../../thunks/getSessionList'
import { TableData } from '../TableData/TableData'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()

  const total = useAppSelector(getTotal)
  const currentPage = useAppSelector(getCurrentPage)

  useEffect(() => {
    store.reducerManager.add('sessions', reducer)
    store.dispatch({ type: '@@INIT_SESSIONS' })
    return () => {
      store.reducerManager.remove('sessions')
    }
  }, [store])

  useEffect(() => {
    dispatch(getSessionList())
  }, [currentPage])

  return (
    <div className={cls.main}>
      <Text className={cls.title}>Активные сессии аккаунта</Text>
      <TableData />
      <Pagination
        currentPage={currentPage}
        onChange={(v) => dispatch(actions.setCurrentPage(v))}
        total={total}
        pageCount={PAGE_COUNT}
      />
    </div>
  )
}
