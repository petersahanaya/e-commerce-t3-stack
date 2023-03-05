import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { BsFilter } from "react-icons/bs"
import { CiSearch } from "react-icons/ci"
import { ChangeEvent, useCallback, useState } from "react"
import { prisma } from "@/server/utils/context"
import Card from "@components/Products/Card"
import { appRouter } from "@/server/routers/root"
import Link from "next/link"

const Search: React.FC<{ products: Product[] }> = ({ products }) => {
    const [search, setSearch] = useState("")
    const [data, setData] = useState<Product[]>([])
    const [filter, setIsFilter] = useState({
        woman : false,
        man : false,
        all : true
    })
    const [toggle, setToggle] = useState(false)

    const handleEnter = useCallback((e: KeyboardEvent): void => {
        if (e.key === "Enter") {
            setData(products.filter((product) => search.toLowerCase().includes(product.title.toLowerCase())))

            setSearch("")
        }
    }, [products, search])

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        if (!value) {
            setSearch("")
            return setData([])
        }else {
            setSearch(value)
            setData(products)

            setData((products) => products.filter((product) => product.title.toLowerCase().indexOf(value.toLowerCase()) > -1))
        }
    }, [products])

    return (
        <main className="bg-neutral-900 w-screen overflow-y-scroll h-screen pb-8">
            <header className="w-full h-[12vh] p-2 flex justify-around items-center">
                <div className="relative w-60">
                    {/*@ts-expect-error keyboard events error */}
                    <input onKeyDown={handleEnter} onChange={handleSearch} name='search' value={search} className="p-2 outline-none text-sm tracking-tight bg-neutral-600 rounded-full pl-12 w-full text-stone-50" type="text" placeholder="search product.." />
                    <CiSearch className="absolute p-1 rounded-full bg-neutral-200 top-[5px] left-[10px]" size={25} />
                </div>
                <BsFilter onClick={() => setToggle(prev => !prev)} className="bg-stone-100 p-1 rounded-2xl" size={30} />
            </header>
            <nav>
                {!data || !data.length && <p className="mt-3 text-center text-stone-400 text-sm">Search for product you want 😆</p>}
            </nav>
            <nav className="w-screen flex flex-col justify-center items-center">
                {data.map((product) => (
                    <Link href={`/product/${product.id}`} className="w-[250px] mt-2" key={product.id}>
                        <Card props={product} />
                    </Link>
                ))}
            </nav>
        </main>
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

    const products = await appRouter.createCaller({ req, res, prisma }).products()

    return {
        props: {
            products
        }
    }
}

export default Search