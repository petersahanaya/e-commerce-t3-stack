import Link from "next/link"

const Cancel = () => {
  return (
    <main className="w-screen h-screen flex flex-col  items-center pt-20 bg-neutral-900">
        <h3 className="text-center text-2xl font-[600] text-stone-100">You&apos;ve canceled 🥲 your purchase !</h3>
        <Link href="/" className="px-3 bg-lime-400 p-2 rounded-xl text-stone-800 mt-3 hover:bg-lime-500 transition-[300ms]">Continue Shopping 🛒</Link>
    </main>
  )
}

export default Cancel