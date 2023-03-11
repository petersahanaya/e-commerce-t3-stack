import { trpc } from "@/server/utils/trpc"
import Link from "next/link"
import Card from "./Card"

const Products : React.FC<{products : Product[]}> = ({products}) => {
    const { data : productss, isLoading } = trpc.products.useQuery({take : 10, skip : 8}, {
        placeholderData : products
    })

    if (isLoading) {
        return <p>Loading..</p>
    }

  return (
    <main className="p-2 mt-4 xl:p-6 md:p-4 3xl:p-10 ">
        <h4 id="popular" className="font-[700] text-2xl 3xl:text-8xl text-stone-100 xl:mb-4 3xl:mb-12 md:mb-4 md:text-3xl 2lg:text-6xl">Most <span className="text-pink-600">Popular</span> 👟</h4>
        <nav className="mt-3 grid grid-cols-1 xl:grid-cols-3 3xl:grid-cols-4 3xl:gap-6 4xl:grid-cols-3 md:grid-cols-2 xl:gap-4 gap-2 2lg:grid-cols-3">
            {productss?.map(product => (
                <Link href={`/product/${product.id}`} key={product.id}>
                    <Card props={product}/>
                </Link>
            ))}
        </nav>
    </main>
  )
}

export default Products