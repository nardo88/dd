import { ArticleEditor } from '@features/ArticleEditor'
import { Layout } from '@widgets/Layout'

export default function EditorPage() {
  return (
    <Layout title={'Редактор'}>
      <Layout.Header />
      <Layout.Content>
        <ArticleEditor />
      </Layout.Content>
    </Layout>
  )
}
