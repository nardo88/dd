import dynamic from 'next/dynamic'

export const AsyncMarkdownViewer = dynamic(
  () => import('./MarkdownViewer').then((mode) => mode.MarkdownViewer),
  { ssr: false }
)
