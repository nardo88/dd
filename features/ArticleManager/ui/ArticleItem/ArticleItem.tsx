import { useRouter } from 'next/router'
import { FC } from 'react'

import { useNotification } from '@entities/Notifications'
import dayjs from 'dayjs'

import { remove } from '@features/ArticleManager/asyncThunk/remove'

import { useAppDispatch } from '@shared/hooks/redux'
import { Button } from '@shared/ui/Button/Button'
import { Edit } from '@shared/ui/Icons/Edit'
import { Remove } from '@shared/ui/Icons/Remove'
import { Text } from '@shared/ui/Text/Text'

import { IArticle } from '../../types'

import cls from './ArticleItem.module.scss'

interface ArticleItemProps extends IArticle {
  className?: string
}

export const ArticleItem: FC<ArticleItemProps> = (props) => {
  const { title, category, updatedAt, id } = props
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { addNotification } = useNotification()

  const deleteHandler = () => {
    dispatch(remove({ id, addNotification }))
  }

  return (
    <div className={cls.ArticleItem}>
      <Text>{title}</Text>
      <Text>{category}</Text>
      <Text>{dayjs(updatedAt).format('DD.MM.YYYY HH:mm')}</Text>
      <Button variant="icon" onClick={() => router.push(`/editor/${id}`)}>
        <Edit />
      </Button>
      <Button variant="icon" onClick={deleteHandler}>
        <Remove />
      </Button>
    </div>
  )
}
