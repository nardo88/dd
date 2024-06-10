import { FC, useEffect } from 'react'
import cls from './Main.module.scss'
import { Tabs } from '../Tabs/Tabs'
import { articleEditorReducer } from '../../modules/slice'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { useAppSelector } from '@shared/hooks/redux'
import { getActiveTab } from '../../modules/selectors'
import { Settings } from '../Settings/Settings'

interface MainProps {
  id?: string
}

export const Main: FC<MainProps> = (props) => {
  const { id } = props
  const store = useStore() as ReduxStoreWithManager
  const activeTab = useAppSelector(getActiveTab)

  useEffect(() => {
    store.reducerManager.add('articleEditor', articleEditorReducer)
    return () => {
      store.reducerManager.remove('articleEditor')
    }
  }, [store])

  return (
    <div className={cls.Main}>
      <Tabs />
      <div className={cls.content}>
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  )
}
