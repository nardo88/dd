import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { useAppDispatch } from '@shared/hooks/redux'
import { Text } from '@shared/ui/Text/Text'

import { reducer } from '../../slice'
import { TableData } from '../TableData/TableData'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()

  useEffect(() => {
    store.reducerManager.add('sessions', reducer)
    store.dispatch({ type: '@@INIT_SESSIONS' })
    return () => {
      store.reducerManager.remove('sessions')
    }
  }, [store])
  return (
    <div className={cls.main}>
      <Text className={cls.title}>Активные сессии аккаунта</Text>
      <TableData />
    </div>
  )
}
