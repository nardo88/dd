import { getSessionData } from '@entities/User'
import { ArticleEditor } from '@features/ArticleEditor'
import { NOT_FOUND_PAGE } from '@shared/consts/pages'
import { useAppSelector } from '@shared/hooks/redux'
import { AccessType } from '@shared/types/pages'
import { Loader } from '@shared/ui/Loader/Loader'
import { Layout } from '@widgets/Layout'
import { NotFoundPage } from '@widgets/NotFoundPage'
import { useEffect, useState } from 'react'

export default function EditorPage() {
  const [access, setAccess] = useState<AccessType>('pending')
  const { isAuth, isReady, userData } = useAppSelector(getSessionData)

  useEffect(() => {
    if (isReady) {
      if (userData?.roles?.includes('admin')) {
        setAccess('access')
      } else {
        setAccess('forbidden')
      }
    }
  }, [isAuth, isReady])

  return (
    <Layout title={access === 'pending' ? '' : access === 'access' ? 'Редактор' : NOT_FOUND_PAGE}>
      <Layout.Header />
      <Layout.Content>
        {access === 'pending' && <Loader fill />}
        {access === 'forbidden' && <NotFoundPage />}
        {access === 'access' && <ArticleEditor />}
      </Layout.Content>
    </Layout>
  )
}
