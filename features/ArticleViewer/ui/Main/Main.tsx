import { FC, useEffect } from 'react'
import cls from './Main.module.scss'
import { useRouter } from 'next/router'
import { Sidebar } from '@features/Sidebar'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { articleReducer } from '../../modules/slice'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getArticle } from '../../modules/asyncThunk'
import { getArticleBody } from '../../modules/selectors'
import { BodyOutput } from '@shared/ui/Body'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const { query } = useRouter()
  const { articleId } = query

  const article = useAppSelector(getArticleBody)
  console.log('article: ', article)

  useEffect(() => {
    if (articleId) {
      dispatch(getArticle(articleId.toLocaleString()))
    }
  }, [articleId])

  useEffect(() => {
    store.reducerManager.add('article', articleReducer)
    return () => {
      store.reducerManager.remove('article')
    }
  }, [store])

  return (
    <div className={cls.Main}>
      <Sidebar />
      <div className={cls.content}>
        <BodyOutput body={article} />
      </div>
    </div>
  )
}
