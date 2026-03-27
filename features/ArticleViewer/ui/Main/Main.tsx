import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { ReduxStoreWithManager } from '@app/redux'
import { getSessionData } from '@entities/User'

import { Sidebar } from '@features/Sidebar'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { BodyOutput } from '@shared/ui/Body'
import { Button } from '@shared/ui/Button/Button'
import { ArrowBottom } from '@shared/ui/Icons/ArrowBottom'
import { Loader } from '@shared/ui/Loader/Loader'

import { getArticle } from '../../modules/asyncThunk'
import { getArticleBody, getIsLoading } from '../../modules/selectors'
import { articleReducer } from '../../modules/slice'
import { Navigation } from '../Navigation/Navigation'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()
  const { query } = useRouter()
  const { id } = query

  const article = useAppSelector(getArticleBody)
  const isLoading = useAppSelector(getIsLoading)
  const { userData } = useAppSelector(getSessionData)

  const gotToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
        {!isLoading && (
          <>
            <Navigation />
            <BodyOutput body={article} />
            <Button onClick={gotToTop} className={cls.goTopBtn}>
              <ArrowBottom />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
