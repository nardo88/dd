import { FC } from 'react'
import cls from './Settings.module.scss'
import { Select } from '@shared/ui/Select/Select'
import { categories } from '@shared/consts/categories'
import { Input } from '@shared/ui/Input'

interface SettingsProps {
  className?: string
}

export const Settings: FC<SettingsProps> = () => {
  return (
    <div className={cls.Settings}>
      <Select label="Категория" options={categories} onChange={() => null} />
      <Input value="" label="Заголовок" onChange={() => null} />
      <Input value="" label="РКаткое описание" onChange={() => null} />
    </div>
  )
}
