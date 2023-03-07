import Image from "next/image"

const Preview = () => {
  return (
    <main className="w-screen h-[28vh] xl:h-[45vh] bg-neutral-800 relative xl:bg-gradient-to-b from-stone-900 to-neutral-800 xl:mt-12 md:mt-16 md:h-[45vh]">
        <Image className="absolute selection:bg-transparent right-0 bottom-[-10px] xl:w-[400px] xl:h-[400px] xl:bottom-[-60px] xl:right-[80px] md:w-[300px] md:h-[350px] md:bottom-[-60px] md:right-[20px]" src="/adidas.png" width={190} height={190} alt="preview shoes"/>
        <h4 className="text-3xl xl:text-6xl xl:top-[60px] xl:left-[60px] xl:w-[38rem]  md:text-6xl md:top-[60px] md:left-[60px] md:w-[38rem] z-10 selection:text-stone-700 selection:bg-orange-50 font-[600] text-stone-100 tracking-tighter w-[60vw] absolute top-[20px] left-[10px]"><span className="text-orange-500">Buy</span> and <span className="text-lime-500">Get</span> <span className="text-purple-500">Original</span> Brand</h4>
        <p className="hidden xl:inline-block absolute xl:top-[190px] left-[60px] w-[37rem] text-stone-400 tracking-tight md:top-[190px] md:inline-block md:w-[30rem]">
          Shoes commerce is defined as selling and purchasing goods and services using the internet.
        </p>
        <a href="#popular" className="absolute z-10 bottom-[20px] left-[20px] xl:bottom-[30px] xl:left-[70px] xl:px-12 md:bottom-[30px] md:left-[70px] md:px-12   bg-lime-400 selection:bg-transparent hover:bg-lime-500 transition-[200ms] text-stone-800 shadow-sm font-[400] p-2 tracking-wider px-4 rounded-full">buy now!</a>
    </main>
  )
}

export default Preview