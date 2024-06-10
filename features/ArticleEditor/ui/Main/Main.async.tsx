import { LoadComponent } from '@shared/ui/LoadComponent/LoadComponent'
import dynamic from 'next/dynamic'

export const AsyncMain = dynamic(
  () => import('./Main').then((mode) => mode.Main),
  {
    loading: () => <LoadComponent />,
    ssr: false,
  }
)
