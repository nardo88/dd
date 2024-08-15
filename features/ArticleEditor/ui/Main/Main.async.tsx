import { Loader } from '@shared/ui/Loader/Loader'
import dynamic from 'next/dynamic'

export const AsyncMain = dynamic(
  () => import('./Main').then((mode) => mode.Main),
  {
    loading: () => <Loader fill />,
    ssr: false,
  }
)
