import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { sandboxReducer } from '../../slice'
import { Content } from '../Content/Content'
import { Control } from '../Control/Control'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const router = useRouter()
  const { type } = router.query

  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    store.reducerManager.add('sandbox', sandboxReducer)
    store.dispatch({ type: 'sandbox' })

    return () => {
      store.reducerManager.remove('sandboxList')
    }
  }, [store])

  if (!type) return null

  return (
    <div className={cls.main}>
      <Control />
      <Content type={type.toLocaleString()} />
    </div>
  )
}
