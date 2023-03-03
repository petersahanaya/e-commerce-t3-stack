import { trpc } from '@/server/utils/trpc'
import '@/styles/globals.css'
import type { AppProps, AppType } from 'next/app'
import {Poppins} from "next/font/google"
import {SessionProvider} from "next-auth/react"

const poppins = Poppins({subsets : ['latin'], weight : ['300','400', '500','600','800', '900'], fallback : ['sans-serif']})

const App : AppType = ({ Component, pageProps : {session, ...pageProps} }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)