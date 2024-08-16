import dayjs from 'dayjs'
import { FC } from 'react'
import cls from './ArticleCard.module.scss'
import Link from 'next/link'
import { classNames } from '@shared/helpers/classNames'
import { Text, TextVariant } from '../Text/Text'
import { categories } from '@shared/consts/categories'

interface ArticleCardProps {
  className?: string
  id: string
  image?: string
  title: string
  description: string
  category: string
  createdAt: number
}

export const ArticleCard: FC<ArticleCardProps> = (props) => {
  const { className, id, image, title, description, category, createdAt } = props
  const cat = categories.find((i) => i.id === category)

  return (
    <Link href={`/article/${id}`} className={classNames(cls.ArticleCard, {}, [className])}>
      <div className={cls.top}>
        <img src={image || '/img/templates/empty.png'} />
      </div>
      <div className={cls.bottom}>
        <div className={cls.titles}>
          <Text className={cls.title}>{title}</Text>
          <Text className={cls.description}>{description}</Text>
        </div>
        <div className={cls.category}>
          <Text variant={TextVariant.HELPER}>{cat ? cat.title : category}</Text>
          <Text variant={TextVariant.SMALL} className={cls.date}>
            {dayjs(createdAt).format('DD.MM.YYYY')}
          </Text>
        </div>
      </div>
    </Link>
  )
}
