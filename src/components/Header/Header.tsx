import { Session } from "next-auth"
import { CiSearch } from "react-icons/ci"
import { BsHandbag } from "react-icons/bs"
import Images from "@components/Images/Images"
import Link from "next/link"
import { useState } from "react"
import Sidebar from "@components/Sidebar/Sidebar"
import { AnimatePresence } from "framer-motion"
import { signOut } from "next-auth/react"
import Image from "next/image"

const Header: React.FC<{ user: Session['user'] }> = ({ user }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <header className="w-screen h-[12vh] md:h-[10vh] flex justify-around items-center xl:justify-between p-2 xl:px-28 xl:fixed top-0 right-0 z-10 xl:backdrop-blur-md xl:z-40 md:justify-between md:px-20 md:fixed  md:backdrop-blur-md md:z-40">
      <Link className="xl:flex md:flex justify-around items-center gap-3" href="/profile">
        <div className="relative w-[55px] h-[55px] md:w-[75px] md:h-[75px] xl:w-[65px] xl:h-[65px]">
          <Image alt="profile photo" className="rounded-full selection:bg-transparent" src={user.image!} fill />
        </div>
        <p className="hidden md:inline-block xl:inline-block md:text-xl text-stone-300 font-[400]">{user.name}</p>
      </Link>
      <section className="flex justify-between items-center gap-2 xl:gap-4 md:gap-5">
        <Link href="/search" className="bg-stone-100 rounded-full w-max h-max  p-2">
          <CiSearch size={26} />
        </Link>
        <Link href="/cart" className="bg-stone-100 rounded-full w-max h-max  p-2">
          <BsHandbag size={26} />
        </Link>
        {/* Phone Responsive */}
        <div onClick={() => setToggle(prev => !prev)} className="xl:hidden md:hidden w-6 ml-4 flex flex-col justify-center items-center gap-2 z-30">
          <span className={`w-full transition-all h-[2px] rounded-xl bg-stone-200 ${toggle && "rotate-[-40deg] translate-y-[5px]"}`}></span>
          <span className={`w-full transition-all translate h-[2px] rounded-xl bg-stone-200 ${toggle && "rotate-[45deg] translate-y-[-5px]"}`}></span>
        </div>
        {/* Laptop Responsive */}
        <div onClick={() => signOut()} className="hidden md:text-lg  xl:inline-block border-[1px] md:inline-block border-stone-400 rounded-xl p-2 text-stone-100 text-sm px-10 hover:bg-orange-50 transition-[300ms] hover:text-stone-800 hover:font-[500] cursor-pointer">
          <p>Log Out</p>
        </div>
      </section>
      <AnimatePresence>
      {toggle && <Sidebar/>}
      </AnimatePresence>
    </header>
  )
}

export default Header