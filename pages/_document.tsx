import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,700&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="favicons/favicon-96x96.png" />
        <Script
          src="https://cdn.jsdelivr.net/pyodide/v0.28.0/full/pyodide.js"
          strategy="beforeInteractive"
        />
        <Script src="/cdn/php-wasm.mjs" type="module" strategy="beforeInteractive" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
