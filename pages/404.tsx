import { Layout } from '@widgets/Layout'
import { NotFoundPage } from '@widgets/NotFoundPage'

const Home: React.FC = () => {
  return (
    <Layout title={'Страница не найдена'}>
      <Layout.Header />
      <Layout.Content>
        <NotFoundPage />
      </Layout.Content>
    </Layout>
  )
}

export default Home
