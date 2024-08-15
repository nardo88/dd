import { getSessionData } from '@entities/User'
import { Catalog } from '@features/Catalog'
import { AccessType } from '@shared/types/pages'
import { Loader } from '@shared/ui/Loader/Loader'
import { Layout } from '@widgets/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home: React.FC = () => {
  const [access, setAccess] = useState<AccessType>('pending')
  const { push } = useRouter()
  const { isReady, isAuth } = useSelector(getSessionData)

  useEffect(() => {
    if (isReady) {
      if (isAuth) {
        setAccess('access')
      } else {
        push('/signin')
      }
    }
  }, [isReady, isAuth])

  return (
    <Layout title={'Главная'}>
      <Layout.Header />
      <Layout.Content>
        {access === 'pending' && <Loader fill />}
        {access === 'access' && <Catalog />}
      </Layout.Content>
    </Layout>
  )
}

export default Home
