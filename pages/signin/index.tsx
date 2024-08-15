import { getSessionData } from '@entities/User'
import { Login } from '@features/Login'
import { useAppSelector } from '@shared/hooks/redux'
import { AccessType } from '@shared/types/pages'
import { Loader } from '@shared/ui/Loader/Loader'
import { Layout } from '@widgets/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Signup: React.FC = () => {
  const [access, setAccess] = useState<AccessType>('pending')
  const { isAuth, isReady } = useAppSelector(getSessionData)
  const { push } = useRouter()

  useEffect(() => {
    if (isReady) {
      if (!isAuth) {
        setAccess('access')
      } else {
        push('/')
      }
    }
  }, [isAuth, isReady])

  return (
    <Layout title={'Авторизация'}>
      <Layout.Header />
      <Layout.Content>
        {access === 'pending' && <Loader fill />}
        {access === 'access' && <Login />}
      </Layout.Content>
    </Layout>
  )
}

export default Signup
