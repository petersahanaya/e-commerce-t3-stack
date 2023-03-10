import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import Head from "next/head"
import Image from "next/image"

export const BASEURI = "https://p3commerce.vercel.app" 

const SignIn = () => {
  return (
    <main className="w-screen h-screen relative">
    <Head>
      <title>Sign In | P3-Commerce</title>
      <meta name="description" content="Shop the latest Adidas shoes online through our app. Find exclusive collections, discounts and more. Download now and step up your shoe game." />
      <meta name="keywords" content="Adidas Shoes, Sneakers, Running Shoes, Athletic Footwear, Buy Shoes Online" />
    </Head>
    <header className="w-screen backdrop-blur-md px-10 fixed top-0 left-0 3xl:px-32 z-50 h-[12vh] 3xl:h-[13vh] bg-transparent flex justify-start items-center gap-2 3xl:gap-5">
      <div className="w-[30px] h-[30px] 3xl:w-[100px] 3xl:h-[100px] bg-lime-500 rounded-full"></div>
      <p className="text-lg 3xl:text-5xl text-stone-300 font-[600]">P3Commerce</p>
    </header>
    <Image className="hidden z-30 3xl:hidden" src="/wave.png" fill quality={100} priority alt="cool"/>
    <main className="p-3 w-screen h-screen inline-block 3xl:w-[50vw]4xl:w-[50vw] 4xl:top-[350px] lg:w-[70vw] md:w-[80vw] xl:w-[50vw] xl:flex xl:justify-around xl:items-center xl:top-[60px] 3xl:top-[200px] absolute top-[40px] left-0 z-40">
      <nav className="xl:w-[40vw]">
        <h3 className="text-stone-100 4xl:w-[70vw] text-start xl:text-5xl 4xl:text-9xl md:text-5xl 3xl:text-[10rem] 3xl:leading-[10rem] xl: font-[900] selection:bg-orange-100 
        selection:text-neutral-600
        text-4xl tracking-wider pt-10"><span className="text-lime-400">Sign In</span> and <span className="text-purple-500">Choose</span> your best <span className="text-orange-500">Adidas</span> Shoe&apos;s</h3>
        <p className="mt-4 3xl:text-5xl 4xl:text-4xl 4xl:w-[70vw] 4xl:leading-[3.5rem] 3xl:leading-[4rem] text-sm text-stone-400 w-full text-start">At our online store, you&apos;ll find a wide selection of high-quality Adidas shoes for men, women including running shoes, sneakers. Our inventory is constantly updated to include the latest styles and models, so you can stay ahead of the fashion curve.</p>
        <section className="mt-10 h-[60vh] flex flex-col justify-center items-center gap-2 3xl:gap-4">
          <button onClick={() => signIn("google", { callbackUrl: BASEURI })} className="w-[90vw] bg-neutral-600 rounded-full 3xl:w-[40vw] 4xl:w-[65vw] 4xl:ml-[0rem] 4xl:p-5 md:w-[75vw] lg:w-[65vw] xl:w-[40vw] 3xl:text-7xl 3xl:p-10 text-lg p-2 px-20 flex 3xl:gap-9 3xl:px-32 justify-start  hover:bg-orange-50 hover:text-stone-800 transition-[200ms] items-center gap-4 text-stone-100 font-[500] tracking-wide">
              <FcGoogle  />
              <span className="3xl:text-4xl xl:text-base md:text-xs text-xs">
                Sign In
              </span>
          </button>
          <button onClick={() => signIn("github", { callbackUrl: BASEURI })} className="w-[90vw] bg-neutral-600 rounded-full 3xl:w-[40vw] 4xl:w-[65vw] 4xl:ml-[0rem] 4xl:p-5 md:w-[75vw] lg:w-[65vw] xl:w-[40vw] 3xl:text-7xl 3xl:p-10 text-lg p-2 px-20 flex 3xl:gap-9 3xl:px-32 justify-start hover:bg-orange-50 hover:text-stone-800 transition-[200ms] items-center gap-3 text-stone-100 font-[500] tracking-wide">
              <AiFillGithub />
            <span className="3xl:text-4xl xl:text-base md:text-xs text-xs">
              Sign In
            </span>
          </button>
        </section>
      </nav>
    </main>
    </main>
  )
}

export default SignIn
