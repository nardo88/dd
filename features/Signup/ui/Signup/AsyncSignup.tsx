import { LoadComponent } from '@shared/ui/LoadComponent/LoadComponent'
import dynamic from 'next/dynamic'

export const AsyncSignup = dynamic(() => import('./Signup'), {
  loading: () => <LoadComponent />,
  ssr: false,
})
