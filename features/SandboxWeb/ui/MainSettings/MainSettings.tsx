import { type FC } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Input } from '@shared/ui/Input'

import { getTitle } from '../../selectors'
import { sandboxWebAction } from '../../slice'
import { SettingSection } from '../SettingSection/SettingSection'

import cls from './MainSettings.module.scss'

export const MainSettings: FC = () => {
  const title = useAppSelector(getTitle)
  const dispatch = useAppDispatch()
  return (
    <div className={cls.mainSettings}>
      <SettingSection title="Название">
        <div>
          <Input
            className={cls.input}
            value={title}
            onChange={(v) => dispatch(sandboxWebAction.setTitle(v))}
          />
        </div>
      </SettingSection>
    </div>
  )
}
