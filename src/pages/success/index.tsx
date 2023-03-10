import Link from "next/link"

const Success = () => {
  return (
    <main className="w-screen h-screen flex flex-col  items-center pt-20 bg-neutral-900">
        <h3 className="text-center text-2xl 3xl:text-8xl font-[600] text-stone-100">Yeayy 😙, your shoe&apos;s are successfully purchase !</h3>
        <Link href="/" className="px-3 bg-lime-400 p-2 rounded-xl 3xl:text-6xl 3xl:p-8 3xl:mt-20 text-stone-800 mt-3 hover:bg-lime-500 transition-[300ms]">Continue Shopping 🛒</Link>
    </main>
  )
}

export default Success