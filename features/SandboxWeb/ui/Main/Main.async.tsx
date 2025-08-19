import dynamic from 'next/dynamic'

import { Loader } from '@shared/ui/Loader/Loader'

export const AsyncMain = dynamic(() => import('./Main').then((mode) => mode.Main), {
  loading: () => <Loader />,
  ssr: false,
})
