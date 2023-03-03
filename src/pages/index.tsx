import { appRouter } from "@/server/routers/root"
import { trpc } from "@/server/utils/trpc"
import {prisma} from '../server/utils/context'
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { Session } from "next-auth"
import Header from "@components/Header/Header"
import Preview from "@components/Preview/Preview"

const Home : React.FC<{products : Product, user : Session['user']}> = ({products, user}) =>  {
  const { data, isLoading, isError, error } = trpc.products.useQuery(undefined,{placeholderData : products})

  if (isLoading) {
    return <p>Loading..</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <main className="bg-neutral-900 w-screen h-screen">
      <Header user={user}/>
      <Preview/>
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

  const products = await appRouter.createCaller({req,res, prisma}).products()
  
  return {
    props : {
      products,
      user : session.user
    }
  }
}

export default Home
