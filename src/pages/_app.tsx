import { AppProvider } from '@/app/components/AppContext'
import theme from '@/theme'
import { ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Swapi project</title>
      </Head>

      <ThemeProvider theme={theme}>
        <AppProvider> 
        <Component {...pageProps} />
        </AppProvider>
      </ThemeProvider>
      
    </>
  )
}
