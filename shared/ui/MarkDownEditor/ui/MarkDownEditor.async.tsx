import dynamic from 'next/dynamic'

export const AsyncMarkDownEditor = dynamic(
  () => import('./MarkDownEditor').then((mode) => mode.MarkDownEditor),
  { ssr: false }
)
