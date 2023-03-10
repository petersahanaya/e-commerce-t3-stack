import {GoSignOut} from "react-icons/go"
import { motion } from "framer-motion"
import { SideBarVariant } from "@/functions/Variants/variant"
import {BsFillPersonFill} from "react-icons/bs"
import Link from "next/link"
import { signOut } from "next-auth/react"

const Sidebar = () => {
  return (
    <motion.aside variants={SideBarVariant} exit="hidden" initial="hidden" animate="visible" className="w-[70vw] bg-neutral-800/90 backdrop-blur-sm h-screen fixed top-0 right-0 z-20">
        <Link href="/profile" className="flex mt-20 justify-center items-center gap-6">
            <BsFillPersonFill className="text-stone-100" size={20}/>
            <p className="text-stone-100 selection:bg-transparent font-[400] tracking-wide">Profile</p>
        </Link>
        <div onClick={() => signOut()} className="flex mt-5 justify-center items-center gap-2">
            <GoSignOut className="text-stone-100"/>
            <p className="text-stone-100 selection:bg-transparent font-[400] tracking-wide">Sign Out</p>
        </div>
    </motion.aside>
  )
}

export default Sidebar