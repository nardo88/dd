import { FC, useEffect, useRef } from 'react'
import { IPreviewList } from '../../modules/types'
import { Text } from '@shared/ui/Text/Text'
import { ArrowBottom } from '@shared/ui/Icons/ArrowBottom'
import { classNames } from '@shared/helpers/classNames'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { sidebarAction } from '../../modules/slice'
import { getActiveCategory } from '../../modules/selectors'
import { useRouter } from 'next/router'
import cls from './Category.module.scss'

export const Category: FC<IPreviewList> = (props) => {
  const { _id, titles } = props
  const wrapper = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLUListElement>(null)
  const dispatch = useAppDispatch()
  const active = useAppSelector(getActiveCategory)
  const { query, push } = useRouter()

  const setActiveCategory = () => {
    dispatch(sidebarAction.setActiveCategory(_id))
  }

  const clickHandler = (id: string) => {
    dispatch(sidebarAction.toggleSidebar(false))
    push(`/article/${id}`)
  }

  useEffect(() => {
    if (active !== _id) {
      wrapper.current!.style.height = '0'
    } else {
      wrapper.current!.style.height = content.current!.offsetHeight + 'px'
    }
  }, [active])

  return (
    <div className={cls.Category}>
      <div className={cls.categoryTitle} onClick={setActiveCategory}>
        <Text className={cls.title}>{_id}</Text>
        <ArrowBottom className={classNames(cls.arrow, { [cls.active]: active === _id })} />
      </div>
      <div
        ref={wrapper}
        className={classNames(cls.articleWrapper, { [cls.opened]: active === _id })}>
        <ul className={cls.articleList} ref={content}>
          {titles.map((item) => (
            <li
              key={item.id}
              onClick={() => clickHandler(item.id)}
              className={classNames(cls.article, { [cls.current]: item.id === query.id })}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
