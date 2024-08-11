import { Loader } from '@shared/ui/Loader/Loader'
import dynamic from 'next/dynamic'

export const AsyncCode = dynamic(
  () => import('./Code').then((mode) => mode.Code),
  {
    loading: () => <Loader />,
    ssr: false,
  }
)
