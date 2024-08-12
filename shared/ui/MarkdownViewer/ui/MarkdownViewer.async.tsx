import dynamic from 'next/dynamic'

import { Loader } from '@shared/ui/Loader/Loader'

export const AsyncMarkdownViewer = dynamic(
  () => import('./MarkdownViewer').then((mode) => mode.MarkdownViewer),
  {
    loading: () => <Loader />,
    ssr: false,
  }
)
