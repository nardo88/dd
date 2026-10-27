import { FC, useState } from 'react'

import { AIChat } from '@entities/AIChat'

import { Button } from '@shared/ui/Button/Button'
import { RobotIcon } from '@shared/ui/Icons/RobotIcon'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleChar = () => setIsOpen((p) => !p)
  return (
    <div className={cls.Main}>
      <Button onClick={toggleChar} className={cls.btn}>
        <RobotIcon />
      </Button>
      {isOpen && <AIChat />}
    </div>
  )
}
