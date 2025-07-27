import { FC } from 'react'
import cls from './Setting.module.scss'
import { Popup } from '@shared/ui/Popup/Popup'
import { IBodySetting } from '../../types'
import { Select } from '@shared/ui/Select/Select'
import { LanguagesType } from '@shared/ui/CodeEditor/CodeEditor'
import { Checkbox } from '@shared/ui/Checkbox/Checkbox'

interface ISettingProps {
  close: () => void
  settings?: IBodySetting
  onChange: (field: keyof IBodySetting, value: string | boolean) => void
}

const options: Array<{ id: LanguagesType; title: string }> = [
  { id: 'javascript', title: 'JavaScript' },
  { id: 'typescript', title: 'TypeScript' },
  { id: 'python', title: 'Python' },
  { id: 'php', title: 'PHP' },
]

export const Setting: FC<ISettingProps> = (props) => {
  const { close, settings, onChange } = props

  return (
    <Popup title="Конфигурация компонента" onClose={close} className={cls.setting}>
      <div className={cls.content}>
        <Select
          label="Выберите язык программирования"
          options={options}
          onChange={(v) => onChange('language', v.id)}
          value={options.find((i) => i.id === settings?.language)}
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
      </div>
    </Popup>
  )
}
