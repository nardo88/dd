import { FC } from 'react'

import { sandboxWebAction } from '@features/SandboxWeb/slice'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Checkbox } from '@shared/ui/Checkbox/Checkbox'

import { getSettings } from '../../selectors'
import { SettingSection } from '../SettingSection/SettingSection'

import cls from './CSSSettings.module.scss'

export const CSSSettings: FC = () => {
  const dispatch = useAppDispatch()
  const { useSass } = useAppSelector(getSettings)

  return (
    <div className={cls.jSSettings}>
      <SettingSection title="Общие настройки">
        <div>
          <Checkbox
            checked={useSass}
            className={cls.checkbox}
            label="Использовать SASS"
            onChange={(value) => dispatch(sandboxWebAction.setSettings({ key: 'useSass', value }))}
          />
        </div>
      </SettingSection>
    </div>
  )
}
