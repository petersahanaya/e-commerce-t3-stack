import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { appRouter } from "@/server/routers/root"
import { GetServerSideProps } from "next"
import { prisma } from "@/server/utils/context"
import { getServerSession } from "next-auth"
import { trpc } from "@/server/utils/trpc"
import { useRouter } from "next/router"
import {BiLeftArrow} from "react-icons/bi"
import { BsHandbag } from "react-icons/bs"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { PopUpVariant } from "@/functions/Variants/variant"

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
        <main className="w-screen h-screen bg-neutral-900">
            <header className="w-screen h-[12vh] p-2 flex justify-around items-center">
                <Link href="/">
                <BiLeftArrow className="bg-stone-100 text-stone-700 p-2 rounded-bl-xl rounded-tr-xl hover:bg-stone-300 transition-[200ms]" size={35}/>
                </Link>
                <p className="text-stone-100 font-[600] text-2xl">Adidas 👟</p>
                <Link href="/cart">
                    <BsHandbag className="bg-stone-100 text-stone-700 p-1 rounded-full hover:bg-stone-300 transition-[200ms]" size={35}/>
                </Link>
            </header>
            <nav className="bg-neutral-200">
                <div className="w-[200px] h-48 relative m-auto">
                    <Image className="mix-blend-darken" src={products!.image} alt={products!.title} fill/>
                </div>
            </nav>
            <section className="p-3 flex flex-col justify-center">
                <p className="bg-stone-100 w-max h-max  text-stone-700 p-2 rounded-full text-sm selection:bg-transparent">{product.category}</p>
                <div className="mt-4">
                    <h4 className="text-2xl tracking-wider font-[600] text-stone-100 selection:bg-stone-100 selection:text-stone-700">{product.title}</h4>
                    <p className="text-stone-400 text-sm tracking-tight mt-2 selection:bg-stone-100 selection:text-stone-700">{product.description}</p>
                </div>
                <button disabled={loading} onClick={() => handleAddToCart(id)} className={`bg-lime-400 font-[500] text-stone-800 p-2 rounded-full mt-8 w-[80vw] mx-auto hover:bg-lime-500 transition-[200ms] ${loading && "opacity-70"}`}>Order Now 😁</button>
            </section>
            {success && <motion.div initial="hidden" animate="visible" exit="hidden" variants={PopUpVariant} className="w-[70vw] fixed top-[10px] left-[20%] p-2 text-stone-300 bg-stone-800 text-center text-sm">
                <p>Successfully Added</p>
            </motion.div>}
            {error && <motion.div initial="hidden" animate="visible" exit="hidden" variants={PopUpVariant} className="w-[70vw] fixed top-[10px] left-[20%] p-2 text-stone-300 bg-stone-800 text-center text-sm">
                <p>This item is already added </p>
            </motion.div>}
        </main>
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

/*<div className="flex justify-around items-center gap-2 mt-2">
<button className="bg-stone-100 text-stone-700 p-2 rounded-bl-xl rounded-tr-xl hover:bg-stone-300 transition-[200ms]">
    <MdRemove size={25}/>
</button>
<p className="text-stone-100 text-xl">1</p>
<button className="bg-stone-100 text-stone-700 p-2 rounded-br-xl rounded-tl-xl hover:bg-stone-300 transition-[200ms]">
    <MdAdd size={25}/>
</button>
</div>*/

export default ProductId