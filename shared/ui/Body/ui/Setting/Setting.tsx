import { FC } from 'react'

import { Checkbox } from '@shared/ui/Checkbox/Checkbox'
import { Popup } from '@shared/ui/Popup/Popup'
import { SandboxStacks } from '@shared/ui/Sandbox'
import { Select } from '@shared/ui/Select/Select'

import { AnchorType, BodyItemType, IBodySetting } from '../../types'

import cls from './Setting.module.scss'

interface ISettingProps {
  type: BodyItemType
  close: () => void
  settings?: IBodySetting
  onChange: (field: keyof IBodySetting, value: string | boolean) => void
}

const codeOptions: Array<{ id: SandboxStacks; title: string }> = [
  { id: 'javascript', title: 'JavaScript' },
  { id: 'typescript', title: 'TypeScript' },
  { id: 'python', title: 'Python' },
  { id: 'php', title: 'PHP' },
]

const anchorOptions: Array<{ id: AnchorType; title: string }> = [
  { id: 'h1', title: 'h1' },
  { id: 'h2', title: 'h2' },
  { id: 'h3', title: 'h3' },
  { id: 'h4', title: 'h4' },
  { id: 'h5', title: 'h5' },
]

export const Setting: FC<ISettingProps> = (props) => {
  const { close, settings, onChange, type } = props

  return (
    <Popup title="Конфигурация компонента" onClose={close} className={cls.setting}>
      <div className={cls.content}>
        {/* Code settings */}
        {type === 'code' && (
          <>
            <Select
              label="Выберите язык программирования"
              options={codeOptions}
              onChange={(v) => onChange('language', v.id)}
              value={codeOptions.find((i) => i.id === settings?.language)}
            />
            <Checkbox
              label="Добавить терминал"
              checked={!!settings?.needTerminal}
              onChange={(v) => onChange('needTerminal', v)}
            />
            <Checkbox
              label="Разрешить редактирование"
              checked={!!settings?.canEdit}
              onChange={(v) => onChange('canEdit', v)}
            />
          </>
        )}
        {type === 'anchor' && (
          <>
            <Select
              label="Выберите тип якоря"
              options={anchorOptions}
              onChange={(v) => onChange('anchorType', v.id)}
              value={anchorOptions.find((i) => i.id === settings?.anchorType)}
            />
          </>
        )}
      </div>
    </Popup>
  )
}
