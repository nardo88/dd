import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { RobotIcon } from '@shared/ui/Icons/RobotIcon'

import { getIsOpen } from '../../modules/selectors'
import { actions, aiChatReducer } from '../../modules/slice'
import { Chat } from '../Chat/Chat'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager

  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(getIsOpen)

  const toggleChar = () => {
    dispatch(actions.toggleIsOpen())
  }

  useEffect(() => {
    store.reducerManager.add('aiChat', aiChatReducer)
    return () => {
      store.reducerManager.remove('aiChat')
    }
  }, [store])

  return (
    <div className={cls.Main}>
      <Button onClick={toggleChar} className={cls.btn}>
        <RobotIcon />
      </Button>
      {isOpen && <Chat />}
    </div>
  )
}
