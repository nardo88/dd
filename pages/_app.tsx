import type { AppProps } from 'next/app'
import { ReduxProvider } from '@app/providers/redux'
import '../app/styles/index.scss'
import { SocketProvider } from '@app/providers/socket'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </ReduxProvider>
  )
}
