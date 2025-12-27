import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import Pagination from '@shared/ui/Pagination/Pagination'
import { Text } from '@shared/ui/Text/Text'

import { getArticleList, getCurrentPage, getTotal } from '../../selectors'
import { articleManagerAction } from '../../slice'
import { ArticleItem } from '../ArticleItem/ArticleItem'

import cls from './TableBlock.module.scss'

export const TableBlock: FC = () => {
  const dispatch = useAppDispatch()

  const page = useAppSelector(getCurrentPage)
  const data = useAppSelector(getArticleList)
  const total = useAppSelector(getTotal)

  const changePage = (p: number) => {
    dispatch(articleManagerAction.setCurrentPage(p))
  }

  if (!data.length)
    return (
      <div className={cls.TableBlock}>
        <Text className={cls.empty} variant="helper">
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
