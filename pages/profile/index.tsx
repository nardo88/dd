import { useEffect, useState } from 'react'

import { getSessionData } from '@entities/User'

import { Profile } from '@features/Profile'
import { Layout } from '@widgets/Layout'
import { NotFoundPage } from '@widgets/NotFoundPage'

import { useAppSelector } from '@shared/hooks/redux'
import { AccessType } from '@shared/types/pages'
import { Loader } from '@shared/ui/Loader/Loader'

export default function () {
  const { isAuth, isReady } = useAppSelector(getSessionData)
  const [access, setAccess] = useState<AccessType>('pending')

  useEffect(() => {
    if (isReady) setAccess(isAuth ? 'access' : 'forbidden')
  }, [isAuth, isReady])

  return (
    <Layout title={'Главная'}>
      <Layout.Header />
      <Layout.Content>
        {access === 'pending' && <Loader fill />}
        {access === 'access' && <Profile />}
        {access === 'forbidden' && <NotFoundPage />}
      </Layout.Content>
    </Layout>
  )
}
