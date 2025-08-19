import { FC } from 'react'

import { sandboxWebAction } from '@features/SandboxWeb/slice'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Checkbox } from '@shared/ui/Checkbox/Checkbox'

import { getSettings } from '../../selectors'
import { SettingSection } from '../SettingSection/SettingSection'

import cls from './JSSettings.module.scss'

export const JSSettings: FC = () => {
  const dispatch = useAppDispatch()
  const { useTypeScript } = useAppSelector(getSettings)

  return (
    <div className={cls.jSSettings}>
      <SettingSection title="Общие настройки">
        <div>
          <Checkbox
            checked={useTypeScript}
            className={cls.checkbox}
            label="Использовать TypeScript"
            onChange={(value) =>
              dispatch(sandboxWebAction.setSettings({ key: 'useTypeScript', value }))
            }
          />
        </div>
      </SettingSection>
    </div>
  )
}
