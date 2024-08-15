import { Loader } from '@shared/ui/Loader/Loader'
import dynamic from 'next/dynamic'

export const AsyncSignup = dynamic(() => import('./Signup'), {
  loading: () => <Loader fill />,
  ssr: false,
})
