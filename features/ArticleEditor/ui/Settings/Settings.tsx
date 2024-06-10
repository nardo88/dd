import { FC } from 'react'
import cls from './Settings.module.scss'

interface SettingsProps {
  className?: string
}

export const Settings: FC<SettingsProps> = () => {
  return <div className={cls.Settings}>Settings</div>
}
