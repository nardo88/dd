import { Login } from '@features/Login'
import { Layout } from '@widgets/Layout'

const Signup: React.FC = () => {
  return (
    <Layout title={'Авторизация'}>
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <Login />
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}

export default Signup
