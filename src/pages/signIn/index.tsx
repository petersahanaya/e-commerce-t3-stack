import { signIn } from "next-auth/react"
import {FcGoogle} from "react-icons/fc"
import {AiFillGithub} from "react-icons/ai"

export const BASEURI = "http://localhost:3000"

const SignIn = () => {
  return (
    <main className="bg-neutral-900 p-3 w-screen h-screen overflow-hidden">
      <h3 className="text-stone-100 font-[900] selection:bg-orange-100 
        selection:text-neutral-600
        text-4xl tracking-wider text-center pt-10"><span className="text-lime-400">Sign In</span> and <span className="text-purple-500">Choose</span> your best <span className="text-orange-500">Adidas</span> Shoe&apos;s</h3>
        <section className="mt-10 w-screen h-[60vh] flex flex-col justify-center items-center gap-2">
          <button onClick={() => signIn("google", {callbackUrl : BASEURI})} className="bg-neutral-600 rounded-full p-2 px-20 flex justify-around hover:bg-orange-50 hover:text-stone-800 transition-[200ms] items-center gap-4 text-stone-100 font-[500] tracking-wide">
            <FcGoogle size={25}/>
            Sign In
          </button>
          <button onClick={() => signIn("github", {callbackUrl : BASEURI})} className="bg-neutral-600 rounded-full p-2 px-20 flex justify-around hover:bg-orange-50 hover:text-stone-800 transition-[200ms] items-center gap-3 text-stone-100 font-[500] tracking-wide">
            <AiFillGithub size={25}/>
            Sign In
          </button>
        </section>
    </main>
  )
}

export default SignIn