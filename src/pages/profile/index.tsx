import Images from "@components/Images/Images"
import { GetServerSideProps } from "next"
import { getServerSession, Session } from "next-auth"
import { signOut } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { BiLeftArrow } from "react-icons/bi"
import { GoSignOut } from "react-icons/go"
import {TbArrowsExchange2} from "react-icons/tb"
import { authOptions } from "../api/auth/[...nextauth]"

const Profile : React.FC<{user : Session['user']}> = ({user}) => {
    return (
        <>
        <Head>
            <title>Profile | {user.name}</title>
            <meta name="description" content="Shop the latest Adidas shoes online through our app. Find exclusive collections, discounts and more. Download now and step up your shoe game." />
            <meta name="keywords" content="Adidas Shoes, Sneakers, Running Shoes, Athletic Footwear, Buy Shoes Online" />
        </Head>
        <main className="bg-neutral-900 w-screen h-screen">
            <header className="w-screen h-[12vh] p-2 flex justify-around items-center">
                <Link href="/">
                    <BiLeftArrow className="bg-stone-100 text-3xl text-stone-700 p-2 rounded-bl-xl rounded-tr-xl hover:bg-stone-300 transition-[200ms] 4xl:text-8xl 4xl:p-5 2lg:text-7xl 2lg:p-4" />
                </Link>
                <p className="text-stone-100 font-[600] text-2xl xl:text-3xl md:text-4xl 4xl:text-7xl 2lg:text-6xl">Profile 🤺</p>
            </header>
            <section className="hidden xl:inline-block md:inline-block mt-4">
                <h3 className="ml-[3rem] xl:ml-44 text-2xl font-[500] text-stone-200"><span className="text-3xl xl:text-5xl md:text-5xl 4xl:text-8xl 2lg:text-7xl">Hi</span>, <span className="text-2xl md:text-2xl 4xl:text-6xl 2lg:text-5xl">{user.name}</span></h3>
            </section>
            <nav>
                <div className="flex justify-around items-center xl:hidden md:hidden">
                    <Images src={user.image!} width={65} height={65} alt={user.name!}/>
                    <p className="text-stone-300 font-[500] tracking-tight text-md">{user.name}</p>
                </div>
                <div className="hidden md:flex xl:flex justify-start items-center gap-4 ml-32 mt-10">
                    <div className="relative w-[55px] h-[55px] xl:w-[80px] xl:h-[80px] md:w-[80px] md:h-[80px] 4xl:w-[150px] 4xl:h-[150px] 2lg:w-[200px] 2lg:h-[200px]">
                        <Image className="rounded-full" src={user.image!} fill alt={user.name!}/>
                    </div>
                    <span className="flex flex-col justify-center items-center gap-2 w-[40vw]">
                        <div className="border-[1px] border-stone-500 p-2 rounded-sm w-[40vw]">
                            <p className="text-stone-300 tracking-tight text-[.8rem] lg:text-xs 4xl:text-2xl md:text-xs 2lg:text-3xl 2lg:p-4">{user.name}</p>
                        </div>
                        <div className="border-[1px] border-stone-500 p-2 rounded-sm w-[40vw]">
                            <p className="text-stone-300 tracking-tight text-[.8rem] 4xl:text-2xl lg:text-xs md:text-xs 2lg:text-3xl 2lg:p-4">{user.email}</p>
                        </div>
                    </span>
                </div>
            </nav>
            <footer className="fixed flex flex-col justify-center items-center bottom-[90px] left-[60px]  xl:left-[200px]  lg:bottom-[80px] xl:bottom-[80px] md:left-[100px] md:bottom-[80px]">
            <div onClick={() => signOut()} className="flex mt-5 justify-center items-center gap-2 hover:text-stone-100 mr-12 transition-[300ms] cursor-pointer">
                <span>
                    <GoSignOut className="text-red-500 text-2xl 4xl:text-5xl 2lg:text-5xl"/>
                </span>
                <p className="text-red-400 selection:bg-transparent font-[400] tracking-tight md:text-lg 4xl:text-4xl 2lg:text-4xl">Sign Out</p>
            </div>
            <div onClick={() => signOut()} className="flex mt-2 justify-center items-center gap-2 hover:text-stone-100 transition-[300ms] cursor-pointer">
                <span>
                    <TbArrowsExchange2  className="text-blue-500 text-2xl 4xl:text-5xl 2lg:text-5xl"/>
                </span>
                <p className="text-blue-400 selection:bg-transparent font-[400] tracking-tight md:text-lg 4xl:text-4xl 2lg:text-4xl">Change Account</p>
            </div>
            </footer>
        </main>
        </>
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