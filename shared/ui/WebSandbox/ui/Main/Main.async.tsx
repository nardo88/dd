import dynamic from 'next/dynamic'

export const AsyncMain = dynamic(() => import('./Main').then((mode) => mode.Main), {
  ssr: false,
})
