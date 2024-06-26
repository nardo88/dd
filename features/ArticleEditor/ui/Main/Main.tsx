import { FC, useEffect } from 'react'
import cls from './Main.module.scss'
import { Tabs } from '../Tabs/Tabs'
import { articleEditorReducer } from '../../modules/slice'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getActiveTab } from '../../modules/selectors'
import { Settings } from '../Settings/Settings'
import { getArticleData } from '../../modules/asyncThunks.ts/getArticleData'

interface MainProps {
  id?: string
}

export const Main: FC<MainProps> = (props) => {
  const { id } = props
  console.log('id: ', id)
  const store = useStore() as ReduxStoreWithManager
  const activeTab = useAppSelector(getActiveTab)
  const dispatch = useAppDispatch()

  useEffect(() => {
    store.reducerManager.add('articleEditor', articleEditorReducer)
    return () => {
      store.reducerManager.remove('articleEditor')
    }
  }, [store])

  useEffect(() => {
    if (id) {
      dispatch(getArticleData({ id }))
    }
  }, [id])

  return (
    <div className={cls.Main}>
      <Tabs />
      <div className={cls.content}>
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  )
}
