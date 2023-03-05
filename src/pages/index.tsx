import { appRouter } from "@/server/routers/root"
import {prisma} from '../server/utils/context'
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { Session } from "next-auth"
import Header from "@components/Header/Header"
import Preview from "@components/Preview/Preview"
import Collection from "@components/Collection/Collection"
import Products from "@components/Products/Products"

const Home : React.FC<{products : Product[], collections : Product[], user : Session['user']}> = ({products, user, collections}) =>  {

  return (
    <main className="bg-neutral-900 overflow-x-hidden w-screen h-screen pb-20">
      <Header user={user}/>
      <Preview/>
      <Collection collections={collections}/>
      <Products products={products!}/>
    </main>
  )
}

export const getServerSideProps : GetServerSideProps = async ({req, res}) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user) {
    return {
      redirect : {
        destination : "/signIn",
        permanent : false,
      }
    }
  }

  const products = await appRouter.createCaller({req,res, prisma}).products({skip : 0, take : 10})
  const collections = await appRouter.createCaller({req,res, prisma}).collections()
  
  return {
    props : {
      products,
      collections,
      user : session.user
    }
  }
}

export default Home
