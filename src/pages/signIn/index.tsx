import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"

export const BASEURI = "https://" + process.env.VERCEL_URL || "http://localhost:3000"

const SignIn = () => {
  return (
    <main className="bg-neutral-900 p-3 w-screen h-screen overflow-hidden inline-block xl:flex xl:justify-around xl:items-center">
      <nav className="xl:w-[40vw]">
        <h3 className="text-stone-100 xl: font-[900] selection:bg-orange-100 
        selection:text-neutral-600
        text-4xl tracking-wider text-center pt-10"><span className="text-lime-400">Sign In</span> and <span className="text-purple-500">Choose</span> your best <span className="text-orange-500">Adidas</span> Shoe&apos;s</h3>
        <section className="mt-10 h-[60vh] flex flex-col justify-center items-center gap-2">
          <button onClick={() => signIn("google", { callbackUrl: BASEURI })} className="bg-neutral-600 rounded-full p-2 px-20 flex justify-around hover:bg-orange-50 hover:text-stone-800 transition-[200ms] items-center gap-4 text-stone-100 font-[500] tracking-wide">
            <FcGoogle size={25} />
            Sign In
          </button>
          <button onClick={() => signIn("github", { callbackUrl: BASEURI })} className="bg-neutral-600 rounded-full p-2 px-20 flex justify-around hover:bg-orange-50 hover:text-stone-800 transition-[200ms] items-center gap-3 text-stone-100 font-[500] tracking-wide">
            <AiFillGithub size={25} />
            Sign In
          </button>
        </section>
      </nav>
      <section className="hidden bg-stone-900 xl:inline-block w-[60vw] h-screen relative right-0 top-0">
        <div className="w-[250px] bg-slate-500 h-[250px] rounded-full absolute top-[160px] left-[250px]"></div>
        <div className="w-[255px] bg-slate-100 h-[255px] rounded-full absolute top-[160px] backdrop-blur-md left-[250px]"></div>
        <span className="h-[35vw] w-[60vw] absolute bottom-0 right-0 backdrop-blur-md"></span>
      </section>
    </main>
  )
}

export default SignIn
