import { AppProvider } from '@/app/components/AppContext'
import AppNavBar from '@/app/components/AppNavBar'
import theme from '@/theme'
import { ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter() // use useRouter to get the current route

  return (
    <>
      <Head>
        <title>Swapi project</title>
      </Head>

      <ThemeProvider theme={theme}>
        <AppProvider>
          <AppNavBar activePage={router.pathname} />
          <Component {...pageProps} />
        </AppProvider>
      </ThemeProvider>
    </>
  )
}
