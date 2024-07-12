import { FC } from 'react'
import cls from './TableBlock.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getArticleList, getCurrentPage, getTotal } from '../../selectors'
import Pagination from '@shared/ui/Pagination/Pagination'
import { articleManagerAction } from '../../slice'
import { Text, TextVariant } from '@shared/ui/Text/Text'
import { ArticleItem } from '../ArticleItem/ArticleItem'

export const TableBlock: FC = () => {
  const dispatch = useAppDispatch()

  const page = useAppSelector(getCurrentPage)
  const data = useAppSelector(getArticleList)
  const total = useAppSelector(getTotal)

  const changePage = (p: number) => {
    dispatch(articleManagerAction.setCurrentPage(p))
  }
  console.log('data: ', data)

  if (!data.length)
    return (
      <div className={cls.TableBlock}>
        <Text className={cls.empty} variant={TextVariant.HELPER}>
          Нет данных для отображения
        </Text>
      </div>
    )

  return (
    <div className={cls.TableBlock}>
      <div className={cls.articleList}>
        {data.map((item) => (
          <ArticleItem key={item.id} {...item} />
        ))}
      </div>
      <Pagination
        className={cls.pagination}
        currentPage={page}
        onChange={changePage}
        total={total}
        pageCount={10}
      />
    </div>
  )
}
