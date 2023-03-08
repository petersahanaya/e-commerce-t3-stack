import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { appRouter } from "@/server/routers/root"
import { GetServerSideProps } from "next"
import prisma from "@/functions/Prisma/prisma"
import { getServerSession } from "next-auth"
import { trpc } from "@/server/utils/trpc"
import { useRouter } from "next/router"
import {BiLeftArrow} from "react-icons/bi"
import { BsHandbag } from "react-icons/bs"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { PopUpVariant } from "@/functions/Variants/variant"
import { NumberFormat } from "@/functions/Format/format"
import Head from "next/head"

const ProductId: React.FC<{ product: Product}> = ({ product }) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setIsLoading] = useState(false)

    const router = useRouter()

    const id = router.query.id as string

    const { data : products  } = trpc.product.useQuery({ id }, { placeholderData: product })

    const mutation = trpc.orderProduct.useMutation()
    const utils = trpc.useContext()

    const handleAddToCart = async (id : string) => {
        setIsLoading(true)
        mutation.mutate({id}, {
            onSuccess() {
                setSuccess(true)
                utils.cart.invalidate()
                
                return setTimeout(() => {
                    setSuccess(false)
                }, 1500)    
            },
            onError() {
                setError(true)

                return setTimeout(() => {
                    setError(false)
                }, 1500)    
            },
            onSettled() {
                setIsLoading(false)
            }
        })
    }

    return (
        <>
        <Head>
            <title>{product.title}</title>
            <meta name="description" content="Shop the latest Adidas shoes online through our app. Find exclusive collections, discounts and more. Download now and step up your shoe game." />
            <meta name="keywords" content="Adidas Shoes, Sneakers, Running Shoes, Athletic Footwear, Buy Shoes Online" />
        </Head>
        <main className="w-screen h-screen bg-neutral-900 overflow-hidden">
            <header className="w-screen h-[12vh] p-2 flex justify-around items-center">
                <Link href="/">
                <BiLeftArrow className="bg-stone-100 text-stone-700 p-2 rounded-bl-xl rounded-tr-xl hover:bg-stone-300 transition-[200ms]" size={40}/>
                </Link>
                <p className="text-stone-100 font-[600] text-2xl xl:text-3xl md:text-4xl">Adidas 👟</p>
                <Link href="/cart">
                    <BsHandbag className="bg-stone-100 text-stone-700 p-1 rounded-full hover:bg-stone-300 transition-[200ms]" size={40}/>
                </Link>
            </header>
            {/* Laptop Responsive */}
            <section className="w-screen h-[96vh] xl:flex justify-around items-center xl:p-3 md:flex md:p-3">
            <nav className="bg-neutral-200">
                <div className="xl:h-[370px] xl:translate-y-[-150px] rounded-full overflow-hidden xl:w-max xl:bg-stone-200 md:h-[370px] md:translate-y-[-150px] md:w-max md:bg-stone-200">
                    <div className="w-[200px] h-48 xl:w-[400px] relative xl:h-64 md:w-[400px]  md:h-64  m-auto rounded-xl">
                        <Image className="mix-blend-darken" src={products!.image} alt={products!.title} fill/>
                    </div>
                </div>
            </nav>
            <section className="p-3 flex flex-col justify-center md:mb-52">
                <p className="bg-stone-100 w-max h-max text-stone-700 p-2 rounded-full text-sm selection:bg-transparent md:text-lg">{product.category}</p>
                <div className="mt-4">
                    <span>
                    <h4 className="text-2xl tracking-wider font-[600] text-stone-100 selection:bg-stone-100 selection:text-stone-700 md:text-3xl">{product.title}</h4>
                    <h4 className="text-xl mt-1 tracking-wider font-[600] text-stone-300 selection:bg-stone-100 selection:text-stone-700 md:text-2xl">{NumberFormat(product.price)}</h4>
                    </span>
                    <p className="text-stone-400 text-sm tracking-tight mt-2 selection:bg-stone-100 selection:text-stone-700 xl:w-[40vw] md:w-[40vw] md:text-lg">{product.description}</p>
                </div>
                <button disabled={loading} onClick={() => handleAddToCart(id)} className={`bg-lime-400 font-[500] text-stone-800 p-2 rounded-full mt-8 w-[80vw] mx-auto hover:bg-lime-500 transition-[200ms] xl:w-[40vw] xl:p-4 md:w-[40vw] md:mt-20 md:text-lg md:p-4 ${loading && "opacity-70"}`}>Order Now 😁</button>
            </section>
            </section>
            <AnimatePresence>
            {success && <motion.div initial="hidden" animate="visible" exit="hidden" variants={PopUpVariant} className="w-[70vw] rounded-xl fixed top-[20px] xl:p-3 left-[18%] p-2 text-stone-300 bg-stone-900 text-center text-sm">
                <p>Successfully Added</p>
            </motion.div>}
            {error && <motion.div initial="hidden" animate="visible" exit="hidden" variants={PopUpVariant} className="w-[70vw] rounded-xl fixed top-[20px] xl:p-3 left-[18%] p-2 text-stone-300 bg-stone-900 text-center text-sm">
                <p>This item is already added </p>
            </motion.div>}
            </AnimatePresence>
        </main>
    </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session?.user) {
        return {
            redirect: {
                destination: "/signIn",
                permanent: false
            }
        }
    }

    const result = await appRouter.createCaller({ req, res, prisma }).product({ id: (query.id as string) })

    return {
        props: {
            product: result
        }
    }
}

export default ProductId