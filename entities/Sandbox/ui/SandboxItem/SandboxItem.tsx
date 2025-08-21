import { useRouter } from 'next/router'
import { type FC } from 'react'

import dayjs from 'dayjs'

import { covers } from '@shared/consts/categories'
import { Text } from '@shared/ui/Text/Text'

import { IData } from '../../types'

import cls from './SandboxItem.module.scss'

export const SandboxItem: FC<IData> = (props) => {
  const { _id, stack, title, updatedAt } = props

  const router = useRouter()

  return (
    <div className={cls.sandboxItem} onClick={() => router.push(`/sandbox/${_id}`)}>
      <div className={cls.imageWrapper}>
        <img src={covers[stack]} />
      </div>
      <div className={cls.bottom}>
        <Text className={cls.title} title={title}>{title}</Text>
        <Text className={cls.date}>{dayjs(updatedAt).format('DD.MM.YYYY HH:mm')}</Text>
      </div>
    </div>
  )
}
