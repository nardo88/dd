import { useEffect, useState } from 'react'

import { getSessionData } from '@entities/User'
import { UserList } from '@entities/UserList'

import { Layout } from '@widgets/Layout'

import { useAppSelector } from '@shared/hooks/redux'
import { AccessType } from '@shared/types/pages'
import { Loader } from '@shared/ui/Loader/Loader'
import { NotFoundPage } from '@shared/ui/NotFoundPage/NotFoundPage'

export default function () {
  const { isReady, userData } = useAppSelector(getSessionData)
  const [access, setAccess] = useState<AccessType>('pending')

  useEffect(() => {
    if (isReady) setAccess(userData?.roles?.includes('admin') ? 'access' : 'forbidden')
  }, [isReady])

  return (
    <Layout title={'Главная'}>
      <Layout.Header />
      <Layout.Content>
        {access === 'pending' && <Loader fill />}
        {access === 'access' && <UserList />}
        {access === 'forbidden' && <NotFoundPage />}
      </Layout.Content>
    </Layout>
  )
}
