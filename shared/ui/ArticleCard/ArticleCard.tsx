import { FC } from 'react'
import cls from './ArticleCard.module.scss'
import Link from 'next/link'
import { classNames } from '@shared/helpers/classNames'
import { Text, TextVariant } from '../Text/Text'

interface ArticleCardProps {
  className?: string
  id: string
  image?: string
  title: string
  description: string
  category: string
}

export const ArticleCard: FC<ArticleCardProps> = (props) => {
  const { className, id, image, title, description, category } = props

  return (
    <Link
      href={`/${id}`}
      className={classNames(cls.ArticleCard, {}, [className])}>
      <div className={cls.top}>
        <img src={image || '/img/templates/empty.png'} />
      </div>
      <div className={cls.bottom}>
        <Text className={cls.title} variant={TextVariant.H3}>
          {title}
        </Text>
        <Text className={cls.description}>{description}</Text>
        <div className={cls.category}>
          <Text variant={TextVariant.HELPER}>{category}</Text>
        </div>
      </div>
    </Link>
  )
}
