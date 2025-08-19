import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { sandboxListReducer } from '../../slice'
import { FilterBlock } from '../FilterBlock/FilterBlock'
import { Table } from '../Table/Table'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    store.reducerManager.add('sandboxList', sandboxListReducer)
    store.dispatch({ type: 'sandboxList' })

    return () => {
      store.reducerManager.remove('sandboxList')
    }
  }, [store])

  return (
    <div className={cls.main}>
      <FilterBlock />
      <Table />
    </div>
  )
}
