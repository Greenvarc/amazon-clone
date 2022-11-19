import Image from 'next/image'
import React from 'react'

import {StarIcon} from '@heroicons/react/24/solid'
import {StarIcon as StarIconeOutlined} from '@heroicons/react/24/outline'
import CurrencyFormat from 'react-currency-format'
import { useDispatch } from 'react-redux'
import { addToBasket,removeFromBasket } from '../slices/basketSlice'

function CheckoutProduct({id,title,price,description,category,image,hasprime,rating}) {
    const dispatch=useDispatch()
    const additemToBasket=()=>{
        const product={
            id,
            title,
            price,
            description,
            category,
            image,
            hasprime,
            rating
          }
          dispatch(addToBasket(product))
    }

    const removeItemFromBasket=()=>{
        //remove it
        dispatch(removeFromBasket({id}))
    }

  return (
    <div className='grid grid-cols-5'>
        <Image src={image} height={200} width={200} objectFit='contain' />
        {/* middle */}
        <div className="col-span-3 mx-5">
            <p>{title}</p>
            <div className='flex'>
                {Array(5).fill().map((_,i)=>
                Math.floor(rating?.rate)>i?
                <StarIcon className='h-5 text-yellow-500'/>:<StarIconeOutlined className='h-5'/>
                )}
            </div>
            <p className='text-xs mt-2 my-2 line-clamp-3'>{description}</p>
            <CurrencyFormat
            thousandSeparator={true} 
            prefix={'$'}  
            value={price}/>
            {hasprime && 
            <div className='flex items-center space-x-2'>
                <img loading='lazy' src="https://links.papareact.com/fdw" className='w-12' alt="" />
                <p
                className='text-xs text-gray-400'
                >FREE Next-day Delivery</p>
            </div>
            }
        </div>
        {/* right add/removebtn */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button onClick={additemToBasket} className='buttom'>Add to basket</button>
            <button onClick={removeItemFromBasket} className='buttom'>Remove basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct