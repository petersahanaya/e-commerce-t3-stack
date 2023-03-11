import { Session } from "next-auth"
import { CiSearch } from "react-icons/ci"
import { BsHandbag } from "react-icons/bs"
import Link from "next/link"
import { useState } from "react"
import Sidebar from "@components/Sidebar/Sidebar"
import { AnimatePresence } from "framer-motion"
import { signOut } from "next-auth/react"
import Image from "next/image"

const Header: React.FC<{ user: Session['user'] }> = ({ user }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <header className="w-screen h-[12vh] md:h-[10vh] flex justify-around items-center xl:justify-between p-2 xl:px-28 xl:fixed top-0 right-0 z-10 xl:backdrop-blur-md xl:z-40 md:justify-between md:px-20 md:fixed  md:backdrop-blur-md md:z-40 2xl:justify-between 2xl:px-44 2xl:fixed 2xl:backdrop-blur-md 2xl:h-[15vh]  3xl:justify-between 3xl:px-48 3xl:fixed 3xl:backdrop-blur-md 3xl:h-[13vh]">
      <Link className="xl:flex md:flex justify-around items-center gap-3" href="/profile">
        <div className="relative w-[55px] h-[55px] md:w-[60px] md:h-[60px] xl:w-[65px] xl:h-[65px] 2xl:w-[140px] 2xl:h-[140px] 3xl:w-[240px] 3xl:h-[240px] 4xl:w-[170px] 4xl:h-[170px] 2lg:w-[100px] 2lg:h-[100px]">
          <Image alt="profile photo" className="rounded-full selection:bg-transparent" src={user.image!} fill />
        </div>
        <p className="hidden md:inline-block xl:inline-block md:text-xl 2xl:text-4xl 3xl:text-6xl  4xl:text-5xl text-stone-300 font-[400] 2lg:text-3xl">{user.name}</p>
      </Link>
      <section className="flex justify-between items-center gap-2 xl:gap-4  2xl:gap-6 3xl:gap-7 md:gap-5">
            <Link href="/search" className="bg-stone-100 rounded-full w-max h-max p-2 text-2xl xl:text-4xl 2xl:text-6xl 2xl:p-4 3xl:text-8xl 3xl:p-6 4xl:text-7xl 4xl:p-4 md:text-3xl 2lg:text-5xl 2lg:p-4">
              <CiSearch />
            </Link>
            <Link href="/cart" className="bg-stone-100 rounded-full w-max h-max p-2 text-2xl xl:text-4xl 2xl:text-6xl 2xl:p-4 3xl:text-8xl 3xl:p-6 4xl:text-7xl 4xl:p-4 md:text-3xl 2lg:text-5xl 2lg:p-4">
              <BsHandbag />
            </Link>
        {/* Phone Responsive */}
        <div onClick={() => setToggle(prev => !prev)} className="xl:hidden md:hidden  w-6 ml-4 flex flex-col justify-center items-center gap-2 z-30">
          <span className={`w-full transition-all h-[2px] rounded-xl bg-stone-200 ${toggle && "rotate-[-40deg] translate-y-[5px]"}`}></span>
          <span className={`w-full transition-all translate h-[2px] rounded-xl bg-stone-200 ${toggle && "rotate-[45deg] translate-y-[-5px]"}`}></span>
        </div>
        {/* Laptop Responsive */}
        <div onClick={() => signOut()} className="hidden text-center md:text-lg 2xl:text-3xl 2xl:p-5 2xl:w-[14vw] 3xl:text-5xl 4xl:text-4xl 3xl:p-9 xl:inline-block border-[1px] md:inline-block border-stone-400 rounded-xl p-2 text-stone-100 text-sm px-10 hover:bg-orange-50 transition-[300ms] hover:text-stone-800 hover:font-[500] cursor-pointer 2lg:text-3xl 2lg:p-4">
          <p>Log Out</p>
        </div>
      </section>
      <AnimatePresence>
        {toggle && <Sidebar />}
      </AnimatePresence>
    </header>
  )
}

export default Header