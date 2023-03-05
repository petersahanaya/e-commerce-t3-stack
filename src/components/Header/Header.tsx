import { Session } from "next-auth"
import { CiSearch } from "react-icons/ci"
import { BsHandbag } from "react-icons/bs"
import Images from "@components/Images/Images"
import Link from "next/link"
import { useState } from "react"
import Sidebar from "@components/Sidebar/Sidebar"
import { AnimatePresence } from "framer-motion"

const Header: React.FC<{ user: Session['user'] }> = ({ user }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <header className="w-screen h-[12vh] flex justify-around items-center p-2">
      <Link href="/profile">
        <Images alt="profile photo" property="rounded-full selection:bg-transparent" src={user.image!} width={55} height={55} />
      </Link>
      <section className="flex justify-between items-center gap-2">
        <Link href="/search" className="bg-stone-100 rounded-full w-max h-max  p-2">
          <CiSearch size={26} />
        </Link>
        <Link href="/cart" className="bg-stone-100 rounded-full w-max h-max  p-2">
          <BsHandbag size={26} />
        </Link>
        <div onClick={() => setToggle(prev => !prev)} className="w-6 ml-4 flex flex-col justify-center items-center gap-2 z-30">
        <span className={`w-full transition-all h-[2px] rounded-xl bg-stone-200 ${toggle && "rotate-[-40deg] translate-y-[5px]"}`}></span>
        <span className={`w-full transition-all translate h-[2px] rounded-xl bg-stone-200 ${toggle && "rotate-[45deg] translate-y-[-5px]"}`}></span>
      </div>
      </section>
      <AnimatePresence>
      {toggle && <Sidebar/>}
      </AnimatePresence>
    </header>
  )
}

export default Header