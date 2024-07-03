import dynamic from 'next/dynamic'

export const AsyncMediumText = dynamic(
  () => import('./MediumText').then((mode) => mode.MediumText),
  { ssr: false }
)
