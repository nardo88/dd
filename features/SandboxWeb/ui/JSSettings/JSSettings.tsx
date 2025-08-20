import { FC } from 'react'

import { reactRender } from '@features/SandboxWeb/consts'
import { sandboxWebAction } from '@features/SandboxWeb/slice'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Checkbox } from '@shared/ui/Checkbox/Checkbox'

import { getCode, getSettings } from '../../selectors'
import { SettingSection } from '../SettingSection/SettingSection'

import cls from './JSSettings.module.scss'

export const JSSettings: FC = () => {
  const dispatch = useAppDispatch()
  const { useTypeScript, useReact } = useAppSelector(getSettings)
  const { javaScript } = useAppSelector(getCode)

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
      <SettingSection title="Использование npm пакетов">
        <div>
          <Checkbox
            checked={useReact}
            className={cls.checkbox}
            label="Подключить React"
            onChange={(value) => {
              dispatch(sandboxWebAction.setSettings({ key: 'useReact', value }))
              if (value && !javaScript.includes(reactRender)) {
                dispatch(
                  sandboxWebAction.setCode({
                    key: 'javaScript',
                    value: javaScript.concat(reactRender),
                  })
                )
              }
            }}
          />
        </div>
      </SettingSection>
    </div>
  )
}
