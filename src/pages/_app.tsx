/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { AppProps } from 'next/app'

import '@styles/tailwind.css'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'
import { RaffleContextProvider } from '@contexts/raffle'

const App = ({ Component, pageProps }: AppProps) => (
  <MoralisProvider
    appId={process.env.NEXT_PUBLIC_APP_ID as string}
    serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
  >
    <NotificationProvider>
      <RaffleContextProvider>
        <Component {...pageProps} />
      </RaffleContextProvider>
    </NotificationProvider>
  </MoralisProvider>
)

export default App
