import { LoadComponent } from '@shared/ui/LoadComponent/LoadComponent'
import dynamic from 'next/dynamic'

export const AsyncLogin = dynamic(
  () => import('./Login').then((mode) => mode.Login),
  {
    loading: () => <LoadComponent />,
    ssr: false,
  }
)
