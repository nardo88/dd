import { FC } from 'react'

import { Categories, covers } from '@shared/consts/categories'
import { useAppSelector } from '@shared/hooks/redux'
import { ArticleCard } from '@shared/ui/ArticleCard/ArticleCard'
import { Text } from '@shared/ui/Text/Text'

import { getArticleList } from '../../modules/selectors'

import cls from './Articles.module.scss'

export const Articles: FC = () => {
  const articles = useAppSelector(getArticleList)
  if (!articles.length)
    return (
      <div className={cls.empty}>
        <Text className={cls.emptyText} variant="helper">
          Нет данных для отображения
        </Text>
      </div>
    )
  return (
    <div className={cls.Articles}>
      {articles.map((item) => (
        <ArticleCard
          key={item.id}
          {...item}
          image={item.image || covers?.[item.category as Categories]}
        />
      ))}
    </div>
  )
}
