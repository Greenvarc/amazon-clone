import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
'use client'
const MyApp = ({ Component, pageProps }) => {
  if (typeof window === 'undefined') return<></>
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
