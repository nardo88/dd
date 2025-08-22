import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { useAppDispatch } from '@shared/hooks/redux'

import { sandboxWebReducer } from '../../slice'
import { getData } from '../../thunks/getData'
import { Content } from '../Content/Content'
import { Control } from '../Control/Control'
import { Settings } from '../Settings/Settings'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    store.reducerManager.add('sandboxWeb', sandboxWebReducer)
    store.dispatch({ type: 'sandboxWeb' })

    return () => {
      store.reducerManager.remove('sandboxWeb')
    }
  }, [store])

  useEffect(() => {
    if (!id || typeof id !== 'string') return
    dispatch(getData(id.toLocaleString()))
  }, [id])

  return (
    <div className={cls.main}>
      <Control id={id?.toLocaleString()} />
      <Content />
      <Settings />
    </div>
  )
}
