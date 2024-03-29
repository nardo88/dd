import { getSessionData } from '@entities/User'
import { Layout } from '@widgets/Layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home: React.FC = () => {
  const router = useRouter()
  const session = useSelector(getSessionData)
  useEffect(() => {
    if (session.isReady && !session.isAuth) {
      router.push('/signin')
    }
  }, [session.isAuth, session.isReady, router])

  return (
    <Layout title={'Главная'}>
      <Layout.Header />
      <Layout.Content>
        <div className="container">content</div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}

export default Home
