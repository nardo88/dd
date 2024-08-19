import { FC, useEffect } from 'react'
import cls from './Main.module.scss'
import { Tabs } from '../Tabs/Tabs'
import { articleEditorReducer } from '../../modules/slice'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getActiveTab, getIsLoading } from '../../modules/selectors'
import { Settings } from '../Settings/Settings'
import { getArticleData } from '../../modules/asyncThunks/getArticleData'
import { Content } from '../Content/Content'
import { Loader } from '@shared/ui/Loader/Loader'
import { useNotification } from '@entities/Notifications'

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
    if (id) {
      dispatch(getArticleData({ id, addNotification }))
    }
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
