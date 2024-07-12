import dynamic from 'next/dynamic'

import cls from './Main.module.scss'
import { Loader } from '@shared/ui/Loader/Loader'

export const AsyncMain = dynamic(
  () => import('./Main').then((mode) => mode.Main),
  {
    loading: () => (
      <div className={cls.spinner}>
        <Loader />
      </div>
    ),
  }
)
