import { trpc } from "@/server/utils/trpc"
import Image from "next/image"
import Link from "next/link"

const Card: React.FC<{ collections: Product[] }> = ({ collections }) => {
    const { data: products, isLoading } = trpc.collections.useQuery(undefined, {
        placeholderData: collections
    })

    if (isLoading) {
        return <p>Loading..</p>
    }

    return (
        <nav className="w-screen flex items-center gap-2 overflow-x-auto scrollbar-hide h-36 overflow-y-hidden">
            {products?.map((product) => (
                <Link href={`/product/${product.id}`} className="bg-neutral-200 hover:scale-95 transition-[300ms] relative w-[140px] h-[150px] flex flex-col justify-center items-center  rounded-xl border-[1px] border-stone-600" key={product.id}>
                    <div className="w-[140px] h-[100px] relative">
                        <Image className="mix-blend-darken" src={product.image} alt={product.title} fill />
                    </div>
                    <p className="absolute top-0 right-0 bg-neutral-900 rounded-bl-xl p-2 text-[.8rem] rounded-tl-xl text-stone-50">{product.category}</p>
                    <p className="text-stone-600 text-center text-[.8rem] w-full">{product.title}</p>
                </Link>
            ))}
        </nav>
    )
}

export default Card
