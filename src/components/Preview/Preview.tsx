import Image from "next/image"

const Preview = () => {
  return (
    <main className="w-screen h-[28vh] xl:h-[45vh] 4xl:h-[60vh] bg-neutral-800 relative xl:bg-gradient-to-b from-stone-900 to-neutral-800 xl:mt-12 md:mt-16 3xl:mt-60 md:h-[45vh]">
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img className="absolute selection:bg-transparent right-[-30px] bottom-[-5px] xl:w-[600px] xl:h-[500px] xl:bottom-[-50px] xl:right-[80px] 4xl:right-[-100px] 3xl:w-[1600px] 3xl:h-[1200px] 3xl:bottom-[-60px] 3xl:right-[80px]   md:w-[500px] md:h-[350px] md:bottom-[-30px] md:right-[-50px]" src="/adidas.png" width={280} height={280} alt="preview shoes"/>
        <h4 className="text-4xl w-[80vw] xl:text-6xl xl:top-[60px] xl:left-[60px] xl:w-[38rem] 3xl:text-[18rem] 3xl:top-[60px] 3xl:left-[100px] 3xl:w-[150rem] 4xl:text-[14rem] 4xl:top-[-80px] md:text-6xl md:top-[60px] md:left-[60px] md:w-[38rem] z-10 selection:text-stone-700 selection:bg-orange-50 font-[600] text-stone-100 tracking-tighter absolute top-[20px] left-[10px]"><span className="text-orange-500">Buy</span> and <span className="text-lime-500">Get</span> <span className="text-purple-500">Original</span> Brand</h4>
        <p className="hidden xl:inline-block absolute xl:top-[190px] left-[60px] w-[37rem] 3xl:top-[700px] 3xl:left-[100px] 3xl:w-[140rem] 3xl:text-7xl 4xl:text-5xl 4xl:top-[400px] 4xl:w-[70vw] text-stone-400 tracking-tight md:top-[190px] md:inline-block md:w-[30rem]">
          Shoes commerce is defined as selling and purchasing goods and services using the internet.
        </p>
        <a href="#popular" className="absolute cursor-pointer z-10 bottom-[20px] left-[20px] xl:bottom-[30px] xl:left-[70px] xl:px-12 3xl:bottom-[80px] 3xl:text-7xl 3xl:p-8 3xl:left-[100px] 3xl:px-32 4xl:text-5xl md:bottom-[30px] md:left-[70px] md:px-12 bg-lime-400 selection:bg-transparent hover:bg-lime-500 transition-[200ms] text-stone-800 shadow-sm font-[400] p-2 tracking-wider px-4 rounded-full">buy now!</a>
    </main>
  )
}

export default Preview