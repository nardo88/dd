import { getSessionData } from '@entities/User'
import { Catalog } from '@features/Catalog'
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
        <Catalog />
      </Layout.Content>
    </Layout>
  )
}

export default Home
