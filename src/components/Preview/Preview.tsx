import Image from "next/image"

const Preview = () => {
  return (
    <main className="w-screen h-[28vh] bg-neutral-800 relative">
        <Image className="absolute selection:bg-transparent right-0 bottom-[-10px]" src="/adidas.png" width={190} height={190} alt="preview shoes"/>
        <h4 className="text-3xl z-10 selection:text-stone-700 selection:bg-orange-50 font-[600] text-stone-100 tracking-tighter w-[60vw] absolute top-[20px] left-[10px]"><span className="text-orange-500">Buy</span> and <span className="text-lime-500">Get</span> <span className="text-purple-500">Original</span> Brand</h4>
        <button className="absolute z-10 bottom-[20px] left-[20px] bg-lime-400 selection:bg-transparent hover:bg-lime-500 transition-[200ms] text-stone-800 shadow-sm font-[400] p-2 tracking-wider px-4 rounded-full">buy now!</button>
    </main>
  )
}

export default Preview