import { useRouter } from 'next/router'
import { FC } from 'react'

import { Button } from '@shared/ui/Button/Button'

import cls from './Control.module.scss'

export const Control: FC = () => {
  const router = useRouter()

  return (
    <div className={cls.btnWrapper}>
      <Button onClick={() => router.push('/sandbox')}>Назад</Button>
      <Button>Сохранить</Button>
    </div>
  )
}
