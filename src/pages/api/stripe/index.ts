import prisma from "@/functions/Prisma/prisma";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import Stripe from "stripe"
import { authOptions } from "../auth/[...nextauth]";

//@ts-expect-error 
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!)

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { cartItems } = req.body as { cartItems: Product[] }
    const sessions = await getServerSession(req, res, authOptions)

    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        mode: 'payment',
        line_items: cartItems.map((product) => (
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.title,
                images: [product.image],
                description: product.description,
              },
              unit_amount: product.price
            },
            quantity: 1
          }
        )),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      await prisma?.cart.deleteMany({where : {userId : sessions?.user.id!}})

      res.status(200).json(session)
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default handler