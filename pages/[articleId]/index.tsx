import { ArticleViewer } from '@features/ArticleViewer'
import { Layout } from '@widgets/Layout'

const Home: React.FC = () => {
  return (
    <Layout title={'Главная'}>
      <Layout.Header />
      <Layout.Content>
        <ArticleViewer />
      </Layout.Content>
    </Layout>
  )
}

export default Home
