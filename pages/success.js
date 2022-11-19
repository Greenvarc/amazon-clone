'use client'
import React, { useReducer } from 'react'
import Header from '../components/Header'
import{CheckCircleIcon} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

function Sucess() {
    const router=useRouter()
  return (
    <div className='bg-gray-100 h-screen'>
        <Header/>
        <main className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col p-10 bg-white'>
                <div className='flex items-center space-x-2 mb-5'>
                    <CheckCircleIcon color='green' className='text-green-500 h-10'/>
                    <h1 className='text-3xl'>Tank You  Your order ha been conformed</h1>
                </div>
                <p>
                    Thank you for shopping with us. We'll send a conformation of af 
                    ..item shipped,if you would like to check the status of
                    order(s) please press the link below
                </p>
                <button
                onClick={()=>router.push('/orders')}
                 className='buttom mt-8'>
                    Go to my orders
                </button>
            </div>
        </main>
    </div>
  )
}

export default Sucess