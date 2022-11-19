import { useSession } from 'next-auth/react'
import Image from 'next/image'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import { selectItems, selectTotal } from '../slices/basketSlice'

import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios'
const stripePromise = loadStripe(process.env.stripe_public_key)
import {signIn} from 'next-auth/react'

function Checkout() {
    //items from redux
    const items=useSelector(selectItems)
    const total =useSelector(selectTotal)

    //auth session
    const {data:session}=useSession()

    //checkout session
    const createCheckoutSession=async()=>{
        const stripe=await stripePromise

        //call backent to create checkout session
        const checkoutsession=await axios.post('/api/create-checkout-session',
        {
            //body
            items:items,
            email:session.user.email
        }
        )
        //redirect user to stripecheckout
        const result =await stripe.redirectToCheckout({
            sessionId:checkoutsession.data.id
        })
        //error message ../.
        if(result.error){
            alert(result.error.message)
        }

    }

  return (
    <div className='bg-gray-100'>
        <Header/>
        <main className="lg:flex max-w-screen-2xl mx-auto">
            {/* left section */}
            <div className='flex-grow m-5 shadow-sm'>
                <Image src='https://links.papareact.com/dyz'
                 width={1020}
                 height={250}
                 objectFit='contain'
                 alt='item'
                 />
                 <div className='flex flex-col p-5 space-y-10 bg-white'>
                    <h1 className='text-3xl border-b pb-4 text-red-700'>
                        {items?.length===0?'Your Basket is empty':'Shopping Basket'}
                    </h1>
                    {
                        items?.map((item,i)=>(
                            <CheckoutProduct key={item.id+i} {...item}/>
                        ))
                    }
                 </div>
            </div>
            {/* right */}
            <div className='flex flex-col bg-white p-10 shadow-md'>
                {items.length>0 && (
                    <>
                        <h2 className='whitespace-nowrap'>Subtotal ({items.length} items): 
                        <span className='font-bold'>
                        <CurrencyFormat
                            contentEditable={false}
                            thousandSeparator={true} 
                            prefix={'$'}  
                            value={total}/>
                        </span>
                        </h2>
                        <button
                         role='link'
                         onClick={session?createCheckoutSession:signIn}
                        className={`buttom mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                            {!session? 'Sign in to Checkout':'proceed to checkout'}
                        </button>
                    </>
                )}
            </div>
        </main>
    </div>
  )
}

export default Checkout