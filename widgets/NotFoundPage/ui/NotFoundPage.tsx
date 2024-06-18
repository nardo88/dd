import { useRouter } from 'next/router'
import { FC } from 'react'
import cls from './NotFoundPage.module.scss'
import { classNames } from '@shared/helpers/classNames'
import { Text } from '@shared/ui/Text/Text'
import { Button } from '@shared/ui/Button/Button'
import Icon404 from '@shared/ui/Icons/Icon404'

interface MainProps {
  className?: string
}

export const NotFoundPage: FC<MainProps> = (props) => {
  const { className } = props
  const router = useRouter()

  return (
    <div className={classNames(cls.Main, {}, [className])}>
      <Icon404 className={cls.icon} />
      <Text className={cls.title}>404</Text>
      <Text className={cls.subTitle}>Страница не найдена</Text>
      <Button className={cls.btn} onClick={() => router.push('/')}>
        Перейти на главную
      </Button>
    </div>
  )
}
