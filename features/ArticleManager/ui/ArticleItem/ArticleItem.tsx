import { FC } from 'react'
import cls from './ArticleItem.module.scss'
import { IArticle } from '../../types'
import { Text } from '@shared/ui/Text/Text'
import dayjs from 'dayjs'
import { Button, ButtonVariant } from '@shared/ui/Button/Button'
import { Remove } from '@shared/ui/Icons/Remove'
import { useRouter } from 'next/router'
import { Edit } from '@shared/ui/Icons/Edit'

interface ArticleItemProps extends IArticle {
  className?: string
}

export const ArticleItem: FC<ArticleItemProps> = (props) => {
  const { title, category, updatedAt, id } = props
  const router = useRouter()

  return (
    <div className={cls.ArticleItem}>
      <Text>{title}</Text>
      <Text>{category}</Text>
      <Text>{dayjs(updatedAt).format('DD.MM.YYYY HH:mm')}</Text>
      <Button
        variant={ButtonVariant.ICON}
        onClick={() => router.push(`/editor/${id}`)}>
        <Edit />
      </Button>
      <Button variant={ButtonVariant.ICON}>
        <Remove />
      </Button>
    </div>
  )
}
