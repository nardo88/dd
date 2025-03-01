import { FC, useEffect } from 'react'
import cls from './Main.module.scss'
import { useRouter } from 'next/router'
import { Sidebar } from '@features/Sidebar'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager } from '@app/redux'
import { articleReducer } from '../../modules/slice'
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { getArticle } from '../../modules/asyncThunk'
import { getArticleBody, getIsLoading } from '../../modules/selectors'
import { BodyOutput } from '@shared/ui/Body'
import { Loader } from '@shared/ui/Loader/Loader'
import { getSessionData } from '@entities/User'
import Link from 'next/link'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const { query } = useRouter()
  const { id } = query

  const article = useAppSelector(getArticleBody)
  const isLoading = useAppSelector(getIsLoading)
  const { userData } = useAppSelector(getSessionData)

  useEffect(() => {
    if (id) {
      dispatch(getArticle(id.toLocaleString()))
    }
  }, [id])

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
        {userData?.roles.includes('admin') && (
          <Link className={cls.edit} href={`/editor/${id}`}>
            Редактировать
          </Link>
        )}
        {isLoading && <Loader className={cls.loader} />}
        {!isLoading && <BodyOutput body={article} />}
      </div>
    </div>
  )
}
