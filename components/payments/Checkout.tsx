import { useState } from 'react'
import { ChangeEvent } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { alerts } from '../../utils/alerts'
import { useRouter } from 'next/router'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import axios from 'axios'
import { PaymentIntent } from '@stripe/stripe-js'
import { useUser } from '@auth0/nextjs-auth0/client'

const Checkout = ({
    setOpen,
    clientSecret,
    price,
    userId,
    userRole
}: {
    setOpen: (arg0: boolean) => void
    clientSecret: string
    price: number
    userId: string
    userRole: string
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const { 
        user, 
        isLoading 
    } = useUser();
    const [loading, setLoading] = useState(false)
    const [cardError, setCardError] = useState<string | undefined>(undefined)
    const [message, setMessage] = useState('')

    let userName: string = ''
    if (!isLoading && user && user.email) {
        userName = user.email
    }

    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    let hour = today.getHours()
    let minutes = today.getMinutes()

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setLoading(true)

        const response = await axios.post('/api/payment', {
            totalPrice: price,
            userId: userId,     
            userRole: userRole
        })

        if (response.status === 500) {
            setCardError('error')
            return
        }

        const { paymentIntent: confirmationIntent, error } =
            await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:3000/',
                    payment_method_data: {
                        billing_details: {
                            name: userName || ''
                        }
                    }
                },
                redirect: 'if_required'
            })

        if (error) {
            if (
                error.type === 'card_error' ||
                error.type === 'validation_error'
            ) {
                setCardError(error.message)
            }
            setOpen(false)
            setLoading(false)
            alerts({
                icon: 'error',
                title: 'Hubo un error en tu compra',
                text: cardError
            })
            return
        }

        if (!clientSecret) return

        if (!confirmationIntent) return
        switch (confirmationIntent.status) {
            case 'succeeded':
                alerts({
                    icon: 'success',
                    title: 'Gracias por tu compra!',
                    text: 'Tu pago fue completado con éxito. Aguarda un segundo, te estamos redirigiendo...',
                    showConfirmButton: false,
                    timer: 1500
                })

                setTimeout(() => {
                    router.push('/')
                }, 1000)
                break
            case 'requires_payment_method':
                alerts({
                    icon: 'error',
                    title: 'Hubo un error con tu pago',
                    text: 'Tu pago tuvo inconvenientes'
                })
                break
            default:
                setMessage('Something went wrong.')
                alerts({
                    icon: 'success',
                    title: 'Something went wrong.',
                    text: message
                })
                break
        }

        setOpen(false)
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="h-full w-full">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-full h-1/4 flex flex-col justify-center items-center gap-1 lg:w-2/5">
                    <h1 className="title text-xl lg:text-2xl text-blue-50 h-1/2">
                        Resumen de compra
                    </h1>
                    <div className="flex flex-col font-Rubik bg-blue-100 rounded-md gap-2 justify-center items-center lg:w-full py-4 px-4 lg:py-8 h-1/2">
                        <div className="h-max flex flex-col gap-2">
                            <span className="text-base font-medium lg:text-xl self-end">
                                Total: ${price}
                            </span>
                            <span className="text-xs lg:text-sm text-grey-100 self-end">
                                {day}/{month}/{year} - {hour}:{minutes}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full h-3/4">
                    <PaymentElement id="payment-element" />
                    <button
                        disabled={loading || !stripe || !elements}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4">
                        {loading ? (
                            <AiOutlineLoading3Quarters className="text-xl animate-spin text-blue-50" />
                        ) : (
                            <>Pagar</>
                        )}
                    </button>
                </div>
            </div>
        </form>
    )
}
export default Checkout
