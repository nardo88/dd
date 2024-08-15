import { Loader } from '@shared/ui/Loader/Loader'
import dynamic from 'next/dynamic'

export const AsyncSignup = dynamic(
  () => import('./Main').then((mode) => mode.Main),
  {
    loading: () => <Loader fill />,
    ssr: false,
  }
)
