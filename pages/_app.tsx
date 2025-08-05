import type { AppProps } from 'next/app'

import { ReduxProvider } from '@app/providers/redux'

import '../app/styles/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  )
}
