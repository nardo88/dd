import { Signup } from '@features/Signup'
import { Layout } from '@widgets/Layout'

const SignupPage: React.FC = () => {
  return (
    <Layout title={'Регистрация'}>
      <Layout.Header />
      <Layout.Content>
        <div className="container">
          <Signup />
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default SignupPage
