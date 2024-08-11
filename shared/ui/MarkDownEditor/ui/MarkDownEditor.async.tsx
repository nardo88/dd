import { Loader } from '@shared/ui/Loader/Loader'
import dynamic from 'next/dynamic'

export const AsyncMarkDownEditor = dynamic(
  () => import('./MarkDownEditor').then((mode) => mode.MarkDownEditor),
  {
    loading: () => <Loader />,
    ssr: false,
  }
)
