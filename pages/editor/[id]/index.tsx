import { ArticleEditor } from '@features/ArticleEditor'
import { Layout } from '@widgets/Layout'
import { useRouter } from 'next/router'

export default function EditorPage() {
  const { query } = useRouter()

  if (query.id) return null

  return (
    <Layout title={'Редактор'}>
      <Layout.Header />
      <Layout.Content>
        <ArticleEditor id={query.id} />
      </Layout.Content>
    </Layout>
  )
}
