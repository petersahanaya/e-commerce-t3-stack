import Images from "@components/Images/Images"
import { GetServerSideProps } from "next"
import { getServerSession, Session } from "next-auth"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { BiLeftArrow } from "react-icons/bi"
import { GoSignOut } from "react-icons/go"
import {TbArrowsExchange2} from "react-icons/tb"
import { authOptions } from "../api/auth/[...nextauth]"

const Profile : React.FC<{user : Session['user']}> = ({user}) => {
    return (
        <main className="bg-neutral-900 w-screen h-screen">
            <header className="w-screen h-[12vh] p-2 flex justify-around items-center">
                <Link href="/">
                    <BiLeftArrow className="bg-stone-100 text-stone-700 p-2 rounded-bl-xl rounded-tr-xl hover:bg-stone-300 transition-[200ms]" size={40} />
                </Link>
                <p className="text-stone-100 font-[600] text-2xl xl:text-3xl md:text-4xl">Profile 🤺</p>
            </header>
            <section className="hidden xl:inline-block md:inline-block mt-4">
                <h3 className="ml-[3rem] xl:ml-44 text-2xl font-[500] text-stone-200"><span className="text-3xl xl:text-5xl md:5xl">Hi</span>, <span className="text-2xl md:text-2xl">{user.name}</span></h3>
            </section>
            <nav>
                <div className="flex justify-around items-center xl:hidden md:hidden">
                    <Images src={user.image!} width={65} height={65} alt={user.name!}/>
                    <p className="text-stone-300 font-[500] tracking-tight text-md">{user.name}</p>
                </div>
                <div className="hidden md:flex xl:flex justify-start items-center gap-4 ml-32 mt-10">
                    <div className="relative w-[55px] h-[55px] xl:w-[80px] xl:h-[80px] md:w-[80px] md:h-[80px]">
                        <Image className="rounded-full" src={user.image!} fill alt={user.name!}/>
                    </div>
                    <span className="flex flex-col justify-center items-center gap-2 w-[40vw]">
                        <div className="border-[1px] border-stone-500 p-2 rounded-sm w-[40vw]">
                            <p className="text-stone-300 tracking-tight text-[.8rem] md:text-lg">{user.name}</p>
                        </div>
                        <div className="border-[1px] border-stone-500 p-2 rounded-sm w-[40vw]">
                            <p className="text-stone-300 tracking-tight text-[.8rem] md:text-lg">{user.email}</p>
                        </div>
                    </span>
                </div>
            </nav>
            <footer className="fixed flex flex-col justify-center items-center bottom-[90px] left-[60px] xl:bottom-[200px] xl:left-[200px] md:bottom-[200px] md:left-[100px]">
            <div onClick={() => signOut()} className="flex mt-5 justify-center items-center gap-2 hover:text-stone-100 mr-12 transition-[300ms] cursor-pointer">
                <GoSignOut size={25} className="text-red-500"/>
                <p className="text-red-400 selection:bg-transparent font-[400] tracking-tight md:text-lg">Sign Out</p>
            </div>
            <div onClick={() => signOut()} className="flex mt-2 justify-center items-center gap-2 hover:text-stone-100 transition-[300ms] cursor-pointer">
                <TbArrowsExchange2 size={25} className="text-blue-500"/>
                <p className="text-blue-400 selection:bg-transparent font-[400] tracking-tight md:text-lg">Change Account</p>
            </div>
            </footer>
        </main>
    )
}

export const getServerSideProps : GetServerSideProps = async ({req, res}) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session?.user) {
        return {
            redirect : {
                destination : "/",
                permanent : false
            }
        }
    }

    return {
        props : {
            user : session.user
        }
    }
}

export default Profile