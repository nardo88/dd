import { FC } from 'react'
import cls from './Category.module.scss'
import { IPreviewList } from '../../modules/types'
import { Text } from '@shared/ui/Text/Text'
import { ArrowBottom } from '@shared/ui/Icons/ArrowBottom'
import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { sidebarAction } from '../../modules/slice'
import { getActiveCategory } from '../../modules/selectors'
import { useRouter } from 'next/router'

export const Category: FC<IPreviewList> = (props) => {
  const { _id, titles } = props
  const dispatch = useAppDispatch()
  const active = useAppSelector(getActiveCategory)
  const { query, push } = useRouter()

  const setActiveCategory = () => dispatch(sidebarAction.setActiveCategory(_id))

  const clickHandler = (id: string) => {
    dispatch(sidebarAction.toggleSidebar(false))
    push(`/article/${id}`)
  }

  return (
    <div className={cls.Category}>
      <div className={cls.categoryTitle} onClick={setActiveCategory}>
        <Text className={cls.title}>{_id}</Text>
        <ArrowBottom className={classNames(cls.arrow, { [cls.active]: active === _id })} />
      </div>
      <div className={classNames(cls.articleWrapper)}>
        <ul className={cls.articleList}>
          {titles.map((item) => (
            <div
              onClick={() => clickHandler(item.id)}
              className={classNames(cls.article, { [cls.current]: item.id === query.id })}>
              {item.title}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
