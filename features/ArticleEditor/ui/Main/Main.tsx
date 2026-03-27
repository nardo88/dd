import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'
import { useNotification } from '@entities/Notifications'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Loader } from '@shared/ui/Loader/Loader'

import { getArticleData } from '../../modules/asyncThunks/getArticleData'
import { getActiveTab, getIsLoading } from '../../modules/selectors'
import { articleEditorReducer } from '../../modules/slice'
import { Content } from '../Content/Content'
import { Settings } from '../Settings/Settings'
import { Tabs } from '../Tabs/Tabs'

import cls from './Main.module.scss'

interface MainProps {
  id?: string
}

export const Main: FC<MainProps> = (props) => {
  const { id } = props
  const { addNotification } = useNotification()
  const store = useStore() as ReduxStoreWithManager
  const activeTab = useAppSelector(getActiveTab)
  const isLoading = useAppSelector(getIsLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    store.reducerManager.add('articleEditor', articleEditorReducer)
    return () => {
      store.reducerManager.remove('articleEditor')
    }
  }, [store])

  useEffect(() => {
    if (!id) return
    dispatch(getArticleData({ id, addNotification }))
  }, [id])

  return (
    <div className={cls.Main}>
      {isLoading && <Loader className={cls.loader} />}
      <Tabs />
      <div className={cls.content}>
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'content' && <Content id={id} />}
      </div>
    </div>
  )
}
