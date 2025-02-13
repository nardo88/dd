import { FC } from 'react'
import cls from './Tabs.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getActiveTab, getValidate } from '../../modules/selectors'
import { TabVariant } from '../../types'
import { articleEditorAction } from '../../modules/slice'
import { classNames } from '@shared/helpers/classNames'
import { checkIsError } from '../../modules/helpers/checkIsError'

export const Tabs: FC = () => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector(getActiveTab)
  const validate = useAppSelector(getValidate)

  const setActiveTab = (val: TabVariant) => {
    dispatch(articleEditorAction.changeActiveTab(val))
  }

  return (
    <div>
      <ul className={cls.Tabs}>
        <li
          className={classNames(cls.tabItem, {
            [cls.activeTab]: activeTab === 'settings',
            [cls.invalid]: checkIsError('settings', validate),
          })}
          onClick={() => setActiveTab('settings')}>
          Настройки
        </li>
        <li
          className={classNames(cls.tabItem, {
            [cls.activeTab]: activeTab === 'content',
            [cls.invalid]: checkIsError('content', validate),
          })}
          onClick={() => setActiveTab('content')}>
          Содержимое
        </li>
      </ul>
      {}
    </div>
  )
}
