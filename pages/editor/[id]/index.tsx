import { getSessionData } from '@entities/User'
import { ArticleEditor } from '@features/ArticleEditor'
import { useAppSelector } from '@shared/hooks/redux'
import { Loader } from '@shared/ui/Loader/Loader'
import { Layout } from '@widgets/Layout'
import { NotFoundPage } from '@widgets/NotFoundPage'
import { useRouter } from 'next/router'

export default function EditorPage() {
  const { query } = useRouter()
  const { isAuth, isReady, userData } = useAppSelector(getSessionData)

  return (
    <Layout title={'Редактор'}>
      <Layout.Header />
      <Layout.Content>
        {!isReady && <Loader />}
        {isReady && (!isAuth || !userData?.roles.includes('admin')) && (
          <NotFoundPage />
        )}
        {isReady && isAuth && userData?.roles.includes('admin') && (
          <ArticleEditor id={query.id as string} />
        )}
      </Layout.Content>
    </Layout>
  )
}
