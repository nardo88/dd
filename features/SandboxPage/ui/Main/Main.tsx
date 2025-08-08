import { useRouter } from 'next/router'
import { FC } from 'react'

import { Stacks } from '@shared/types/sandbox'
import { Button } from '@shared/ui/Button/Button'
import { Sandbox } from '@shared/ui/Sandbox'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const router = useRouter()
  const { type } = router.query

  if (!type) return null

  return (
    <div className={cls.main}>
      <div className={cls.btnWrapper}>
        <Button onClick={() => router.push('/sandbox')}>Назад</Button>
        <Button>Сохранить</Button>
      </div>
      <Sandbox language={type.toString() as Stacks} canRun />
    </div>
  )
}
