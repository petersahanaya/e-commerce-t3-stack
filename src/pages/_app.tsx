import { trpc } from '@/server/utils/trpc'
import '@/styles/globals.css'
import type { AppProps, AppType } from 'next/app'
import {Poppins} from "next/font/google"
import {SessionProvider} from "next-auth/react"
import { AnimatePresence,motion } from 'framer-motion'
import { RouteVariant } from '@/functions/Variants/variant'
import Head from 'next/head'

const poppins = Poppins({subsets : ['latin'], weight : ['300','400', '500','600','800', '900'], fallback : ['sans-serif']})

const App : AppType = ({ Component, pageProps : {session, ...pageProps}, router }: AppProps) => {
  return (
    <>
    <Head>
      <title>Adidas Shoes: Buy the Latest Collection Online | P3-Commerce</title>
      <meta name="description" content="Shop the latest Adidas shoes online through our app. Find exclusive collections, discounts and more. Join now and step up your shoe." />
      <meta name="keywords" content="Adidas Shoes, Sneakers, Running Shoes, Athletic Footwear, Buy Shoes Online" />
    </Head>
    <SessionProvider session={session}>
      <AnimatePresence mode='wait' key={router.route}>
        <motion.main variants={RouteVariant} initial="hidden" animate="visible" exit="hidden" className={poppins.className}>
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
    </SessionProvider>
    </>
  )
}

export default trpc.withTRPC(App)