import dynamic from 'next/dynamic'

export const AsyncCode = dynamic(() => import('./Code').then((mode) => mode.Code), {
  ssr: false,
})
