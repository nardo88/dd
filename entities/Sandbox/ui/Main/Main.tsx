import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'
import { getFilterTitle } from '@entities/Sandbox/selectors'
import { sandboxReducer } from '@entities/Sandbox/slice'

import { useAppSelector } from '@shared/hooks/redux'

import { FilterBlock } from '../FilterBlock/FilterBlock'
import { Table } from '../Table/Table'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    store.reducerManager.add('sandbox', sandboxReducer)
    store.dispatch({ type: 'sandbox' })

    return () => {
      store.reducerManager.remove('sandbox')
    }
  }, [store])

  return (
    <div className={cls.main}>
      <FilterBlock />
      <Table />
    </div>
  )
}
