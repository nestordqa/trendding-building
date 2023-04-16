import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma'

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY!, {
    apiVersion: '2022-11-15'
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
        return
    }
    const {
        totalPrice,
        userId,
        userRole
    }: { totalPrice: number; 
        userId:string
        userRole:any
    } = req.body
    try {
        const params: Stripe.PaymentIntentCreateParams = {
            amount: totalPrice * 100,
            currency: 'usd',
            payment_method_types: ['card']
        }
        const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params, {
                apiKey: process.env.STRIPE_SECRET_KEY
            })
        await prisma.student.create({
            data:{
                id: userId,
                membership: userRole,
                userId: userId
            }            
        })
        const payment = await prisma.payment.create({
            data:{
                id: payment_intent?.id,
                method: 'STRIPE',
                amout: totalPrice,
                studentId: userId,
                membership: userRole
            }
        })
        console.log(payment)
        res.status(200).json(payment_intent)
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : 'Internal server error'
        res.status(500).json({ statusCode: 500, message: errorMessage })
    }
}
