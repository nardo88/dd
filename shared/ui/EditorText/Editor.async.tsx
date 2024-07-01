import dynamic from 'next/dynamic'

export const AsyncEditor = dynamic(
  () => import('./Editor').then((mode) => mode.Editor),
  { ssr: false }
)
