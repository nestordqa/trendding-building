import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
// import { Props } from 'pages/adoptions'
import Checkout from './Checkout'
import { useQuery } from 'react-query'
import { redirectionAlert } from '../../utils/alerts';
import { getStudentById } from '../../utils/users'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentIntent, StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import styles from '../../styles/PaymentDetails.module.css'
import axios from 'axios'
import { IoClose } from 'react-icons/io5'
import { useUsers } from '../ContextProvider/ContextProvider'
import { useRouter } from 'next/router';

// const stripePromise = getStripe()
const stripePromise = loadStripe('pk_test_51M9y5pEAdwcBn8LBT7JVGygAveqQs9qERPGoCFo0gkYtsuiFqy1D9XSxUbPRcqrGHsOfyeGyoRYpLgnaAYUA5jJa00zhIbP99y');

const ModalPayment = ({ price, userRole }: any) => {

    const router = useRouter();
    const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
        null
    )
    const [clientSecret, setClientSecret] = useState<string>('')
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const userId = useUsers();

    const { user, error: errorU, isLoading: isLoadingU } = useUser()

    let id: string = ''
    if (!isLoadingU && user && userId) {
        id = userId
    }

    const { data: dbUser, isLoading: uIsLoading } = useQuery(['user', id], () =>
        getStudentById(id)
    )

    const alertPaymentForm = async () => {
        if (!user && !dbUser) {
            handleClose()
            redirectionAlert({
                icon: 'info',
                title: '<strong>Inicio de sesion requerido</strong>',
                html:
                    'Para solicitar una membresía y poder disfrutar de todas nuestras funcionalidades' +
                    ' te invitamos a iniciar sesion o crear una cuenta.',
                confirmButtonText: 'Iniciar sesion',
                confirmButtonAriaLabel: 'Thumbs up, great!',
            })
            setTimeout(()=>{
                router.push('/api/auth/login')
            }, 1000)
            return
        }
        if (dbUser && !uIsLoading) {
            console.log(dbUser)
            if (dbUser.info === false) {
                handleClose()
                redirectionAlert({
                    icon: 'info',
                    title: '<strong>Se requiere que completes tu perfil para realizar la comprar!</strong>',
                    html:
                        'Para poder comprar en nuestra página y poder disfrutar de todas nuestras funcionalidades' +
                        ' te invitamos a completar tu información en el perfil, en unos segundos serás redirigido.',
                    confirmButtonText: 'Ir a mi perfil',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                })
                setTimeout(()=>{
                    router.push('/profile')
                }, 1000)
                return
            }
        }
        handleOpen()
    }

    useEffect(() => {
        if (!uIsLoading && dbUser) {
            const data = {
                totalPrice: price,
                payment_intent_id: paymentIntent?.id,
                userId: userId,     
                userRole: userRole
            }

            if (!data.totalPrice) return
            axios.post('/api/payment', data).then(res => {
                const paymentIntent = res.data;
                console.log(paymentIntent + ' SOY INTENTO PAYMENT')
                setPaymentIntent(paymentIntent)
                setClientSecret(paymentIntent.client_secret)
            })
        }
    }, [price])

    const options: StripeElementsOptions = {
        clientSecret
    }

    return (
        <div className="flex justify-center bg-grey-50">
            <button
                onClick={alertPaymentForm}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Pagar
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(12px)',
                }}
                open={open}
                onClose={handleClose}
                closeAfterTransition>
                <Fade in={open}>
                    <Box className={styles.container}>
                        <div className="flex flex-col justify-center items-center w-full h-full">
                            <div className='flex flex-row w-full'>
                                <button
                                    onClick={handleClose}
                                    className="bg-blue-50 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    <IoClose />
                                </button>
                            </div>
                            <div className='flex flex-col w-full h-full'>
                                    <Elements
                                        stripe={stripePromise}
                                        options={options}>
                                        <Checkout
                                            setOpen={setOpen}
                                            clientSecret={clientSecret}
                                            price={price}
                                            userId={id}
                                            userRole={userRole}
                                        />
                                    </Elements>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
export default ModalPayment
