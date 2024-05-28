import { FC } from 'react'
import cls from './Articles.module.scss'
import { useAppSelector } from '@shared/hooks/redux'
import { getArticleList } from '../../modules/selectors'
import { Text, TextVariant } from '@shared/ui/Text/Text'
import { ArticleCard } from '@shared/ui/ArticleCard/ArticleCard'
import { Categories, covers } from '@shared/consts/categories'

export const Articles: FC = () => {
  const articles = useAppSelector(getArticleList)
  console.log('articles: ', articles)
  if (!articles.length)
    return (
      <div className={cls.empty}>
        <Text className={cls.emptyText} variant={TextVariant.HELPER}>
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
