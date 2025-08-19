import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { sandboxWebReducer } from '../../slice'
import { Content } from '../Content/Content'
import { Control } from '../Control/Control'
import { Settings } from '../Settings/Settings'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    store.reducerManager.add('sandboxWeb', sandboxWebReducer)
    store.dispatch({ type: 'sandboxWeb' })

    return () => {
      store.reducerManager.remove('sandboxWeb')
    }
  }, [store])

  return (
    <div className={cls.main}>
      <Control />
      <Content />
      <Settings />
    </div>
  )
}
