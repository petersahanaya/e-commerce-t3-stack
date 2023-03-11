import { appRouter } from "@/server/routers/root"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { BiLeftArrow } from "react-icons/bi"
import { authOptions } from "../api/auth/[...nextauth]"
import prisma from "@/functions/Prisma/prisma" 
import { trpc } from "@/server/utils/trpc"
import Image from "next/image"
import { NumberFormat } from "@/functions/Format/format"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CardVariant, PopUpVariant } from "@/functions/Variants/variant"
import getStripe from "@/functions/Stripe/Stripe"
import { BASEURI } from "../signIn"
import Head from "next/head"

const Cart: React.FC<{ products: Product[] | null }> = ({ products }) => {
    const [success, setSuccess] = useState(false)
    const [redirecting, setRedirecting] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const { data, refetch } = trpc.cart.useQuery(undefined, {
        placeholderData: products
    })

    const [total, setTotal] = useState(data?.reduce((a, b) => data.length * b.price, 0))

    const handleBuy = async () => {
        try {
            setRedirecting(true)
            const stripe = await getStripe()

            const res = await fetch(BASEURI + '/api/stripe', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cartItems: data })
            })

            if (!res.ok) {
                setRedirecting(true)
                setError(true)

                return setTimeout(() => {
                    setError(false)
                    setRedirecting(false)
                }, 1500)
            }

            const result = await res.json() as { id: string,url : string }

            window.location.replace(result.url)
        } catch (e) {
            console.error(e)
        }finally {
            setRedirecting(false)
            setError(false)
        }
    }

    const utils = trpc.removeProduct.useMutation()

    const handleRemoveItem = (id: string) => {
        setLoading(true)
        utils.mutate({ id }, {
            onError() {
                setError(true)

                return setTimeout(() => {
                    setError(false)
                }, 1500)
            },
            onSuccess() {
                refetch()
                setSuccess(true)
                setTotal(data?.reduce((a, b) => data.length * b.price, 0))

                return setTimeout(() => {
                    setSuccess(false)
                }, 1500)
            },
            onSettled() {
                setLoading(false)
                setTotal(data?.reduce((a, b) => data.length * b.price, 0))
            }
        })
    }

    useEffect(() => {
        setTotal(data?.reduce((a, b) => data.length * b.price, 0))
    }, [data, data?.length])

    return (
        <>
        <Head>
            <title>Cart | P3-Commerce</title>
            <meta name="description" content="Shop the latest Adidas shoes online through our app. Find exclusive collections, discounts and more. Download now and step up your shoe game." />
            <meta name="keywords" content="Adidas Shoes, Sneakers, Running Shoes, Athletic Footwear, Buy Shoes Online" />
        </Head>
        <main className="w-screen pb-32 bg-neutral-900">
            <header className="w-screen h-[12vh] p-2 flex justify-around items-center 2lg:mb-5">
                <Link href="/">
                    <BiLeftArrow className="bg-stone-100 text-4xl 3xl:text-9xl 3xl:p-7 4xl:text-8xl 4xl:p-5 ext-stone-700 p-2 rounded-bl-xl rounded-tr-xl hover:bg-stone-300 transition-[200ms] 2lg:text-8xl 2lg:p-4" />
                </Link>
                <p className="text-stone-100 font-[600] text-2xl 3xl:text-8xl xl:text-3xl md:text-4xl 2lg:text-7xl">Cart 🛒</p>
            </header>
            <AnimatePresence>
                {!data || !data.length && <p className="text-center text-stone-400 text-xl font-[500] tracking-tight mt-4 3xl:text-6xl 2lg:text-5xl">No items yet 🧐</p>}
                <nav className="flex flex-col justify-center gap-2 w-screen ">
                    {data?.map((product, i) => (
                        <motion.section layout variants={CardVariant} initial="hidden" animate="visible" exit="exit" onDoubleClick={() => handleRemoveItem(product.id)} key={product.id} className={`bg-stone-200 flex justify-around items-center rounded-xl`}>
                            <div className="w-[160px] h-[130px] relative md:w-[180px] md:h-[150px] 3xl:w-[500px] 3xl:h-[500px] 4xl:w-[400px] 4xl:h-[400px] 2lg:w-[300px] 2lg:h-[300px]">
                                <Image className="mix-blend-darken" src={product.image} fill alt={product.title} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-stone-700 2lg:text-5xl xl:text-xl md:text-2xl 3xl:text-6xl 4xl:text-5xl">{product.title}</h3>
                                <p className="text-stone-600 text-[.8rem] font-[600] 3xl:text-5xl xl:text-[1.3rem] md:text-xl 4xl:text-5xl 2lg:text-4xl">{NumberFormat(product.price)}</p>
                            </div>
                        </motion.section>
                    ))}
                </nav>
            </AnimatePresence>
            {data ? data.length && <section className="flex 3xl:mt-20 flex-col justify-center items-center">
                <div className="flex justify-around items-center mt-2 w-full mb-3 xl:mt-6 xl:mb-6">
                    <h4 className="text-stone-100 font-[600] text-2xl xl:text-3xl md:text-4xl 3xl:text-8xl 2lg:text-7xl">Total</h4>
                    <p className="text-stone-400 font-[500] 2lg:text-6xl xl:text-xl 4xl:text-6xl md:text-2xl 3xl:text-7xl">{NumberFormat(total!)}</p>
                </div>
                <button onClick={handleBuy} className="bg-lime-500 2lg:text-5xl text-stone-700 p-2 rounded-full w-[70vw] font-[600] hover:bg-lime-600 transition-[200ms] xl:p-3 xl:w-[40vw] md:w-[40vw] md:p-4 md:text-lg md:mt-8 3xl:text-7xl 3xl:p-8 4xl:text-5xl">Buy 💰</button>
                {data && <p className="text-stone-500 text-sm mt-3 3xl:text-5xl 3xl:mt-12 2lg:text-4xl">Double click to delete item 🔴</p>}
            </section> : null}
            <AnimatePresence>
                {success && <motion.div variants={PopUpVariant} initial="hidden" animate="visible" exit="hidden" className="w-[70vw] 3xl:text-5xl 3xl:top-[10rem] 3xl:p-8  rounded-xl fixed top-[20px] xl:p-3 left-[18%] p-2 text-stone-300 bg-stone-800 text-center text-sm">
                    <p>Successfully Removed</p>
                </motion.div>}
                {error && <motion.div variants={PopUpVariant} initial="hidden" animate="visible" exit="hidden" className="w-[70vw] rounded-xl fixed top-[20px] xl:p-3 3xl:text-5xl 3xl:top-[10rem] 3xl:p-8  left-[18%] p-2 text-stone-300 bg-stone-800 text-center text-sm">
                    <p>There&apos;s an error</p>
                </motion.div>}
                {loading && <motion.div variants={PopUpVariant} initial="hidden" animate="visible" exit="hidden" className="w-[70vw] rounded-xl fixed top-[20px] xl:p-3 3xl:text-5xl 3xl:top-[10rem] 3xl:p-8  left-[18%] p-2 text-stone-300 bg-stone-800 text-center text-sm">
                    <p>Removing..</p>
                </motion.div>}
                {redirecting && <motion.div variants={PopUpVariant} initial="hidden" animate="visible" exit="hidden" className="w-[70vw] rounded-xl fixed top-[20px] xl:p-3 3xl:text-5xl 3xl:top-[10rem] 3xl:p-8  left-[18%] p-2 text-stone-300 bg-stone-800 text-center text-sm">
                    <p>Redirect..</p>
                </motion.div>}
            </AnimatePresence>
        </main>
    </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session?.user) {
        return {
            redirect: {
                destination: "/signIn",
                permanent: false
            }
        }
    }

    const products = await appRouter.createCaller({ req, res, prisma }).cart()

    return {
        props: {
            products
        }
    }
}

export default Cart