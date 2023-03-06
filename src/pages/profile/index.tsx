import Images from "@components/Images/Images"
import { GetServerSideProps } from "next"
import { getServerSession, Session } from "next-auth"
import { signOut } from "next-auth/react"
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
                    <BiLeftArrow className="bg-stone-100 text-stone-700 p-2 rounded-bl-xl rounded-tr-xl hover:bg-stone-300 transition-[200ms]" size={35} />
                </Link>
                <p className="text-stone-100 font-[600] text-2xl">Profile 🤺</p>
            </header>
            <nav>
                <div className="flex justify-around items-center ">
                    <Images src={user.image!} width={65} height={65} alt={user.name!}/>
                    <p className="text-stone-300 font-[500] tracking-tight text-md">{user.name}</p>
                </div>
            </nav>
            <footer className="fixed flex flex-col justify-center items-center bottom-[90px] left-[60px]">
            <div onClick={() => signOut()} className="flex mt-5 justify-center items-center gap-2 hover:text-stone-100 mr-12 transition-[300ms]">
                <GoSignOut size={25} className="text-red-500"/>
                <p className="text-red-400 selection:bg-transparent font-[400] tracking-tight">Sign Out</p>
            </div>
            <div onClick={() => signOut()} className="flex mt-2 justify-center items-center gap-2 hover:text-stone-100 transition-[300ms]">
                <TbArrowsExchange2 size={25} className="text-blue-500"/>
                <p className="text-blue-400 selection:bg-transparent font-[400] tracking-tight">Change Account</p>
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