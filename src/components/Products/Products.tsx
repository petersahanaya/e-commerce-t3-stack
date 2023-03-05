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
    <main className="p-2 mt-4">
        <h4 id="popular" className="font-[700] text-2xl text-stone-100">Most <span className="text-pink-600">Popular</span> 👟</h4>
        <nav className="mt-3 flex flex-col justify-center items-center gap-2 ">
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