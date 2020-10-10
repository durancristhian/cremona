import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { ProvideAuth } from '../hooks/useAuth'
import '../styles/globals.css'
import { pageview } from '../utils/gtag'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

const fuego = new Fuego(firebaseConfig)

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_TRACKING_ID) return

    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </>
        )}
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="canonical" href="https://cremona.vercel.app/" />
        <title>Cremona - Multiple choice challenges</title>
        <meta name="title" content="Cremona - Multiple choice challenges" />
        <meta
          name="description"
          content="Create games to play with your audience."
        />
        <meta
          property="og:title"
          content="Cremona - Multiple choice challenges"
        />
        <meta
          property="og:description"
          content="Create games to play with your audience."
        />
        <meta property="twitter:url" content="https://cremona.vercel.app/" />
        <meta
          property="twitter:title"
          content="Cremona - Multiple choice challenges"
        />
        <meta
          property="twitter:description"
          content="Create games to play with your audience."
        />
        <meta property="og:url" content="https://cremona.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://cremona.vercel.app/logo.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="https://cremona.vercel.app/logo.png"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=5"
        />
      </Head>
      <FuegoProvider fuego={fuego}>
        <ProvideAuth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProvideAuth>
      </FuegoProvider>
    </>
  )
}

export default App
