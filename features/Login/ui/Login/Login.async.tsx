import { Loader } from '@shared/ui/Loader/Loader'
import dynamic from 'next/dynamic'

export const AsyncLogin = dynamic(
  () => import('./Login').then((mode) => mode.Login),
  {
    loading: () => <Loader fill />,
    ssr: false,
  }
)
