import Image from 'next/image'
import React, { useState } from 'react'

import {StarIcon} from '@heroicons/react/24/solid'
import {StarIcon as StarIconeOutlined} from '@heroicons/react/24/outline'

import CurrencyFormat from 'react-currency-format'
//redux imports
import { useDispatch } from 'react-redux'
import {addToBasket} from '../slices/basketSlice'

function Product({id,title,description,category,image,rating,price}) {
  const dispatch=useDispatch()
    const [mrating] = useState(Math.floor(Math.random()*(5))+1)
    const [hasprime] = useState(Math.random()<0.5)

    //add item func
    const addItemToBasket=()=>{
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
      //send the prouct to the redux store
      dispatch(addToBasket(product))
    }

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10' >
        <p className='absolute top-2 right-2 text-xs italic text-gray-400'
        >{category}</p>

        <Image src={image} width={200} height={200} objectFit='contain' loading='lazy'/>
        
        <h4 className='my-3'>{title}</h4>

        <div className='flex'>
            {Array(5).fill().map((_,i)=>
            Math.floor(rating.rate)>i?
            <StarIcon className='h-5 text-yellow-500'/>:<StarIconeOutlined className='h-5'/>
            )}
        </div>

        <p
        className='text-xs my-2 line-clamp-2'
        >{description}</p>

        <div className='mb-5'>
         <CurrencyFormat
          thousandSeparator={true} 
          prefix={'$'}  
          value={price}/>
        </div>
        {hasprime&& 
            <div className='flex items-center space-x-2 -mt-5'>
                <img className='w-12' src="https://links.papareact.com/fdw" alt="primed" />
                <p className='text-xs text-gray-500'>Free next-day delivery</p>
            </div>
        }
        <button
        // add to basket
        onClick={addItemToBasket}
        className='mt-auto buttom'
         type='button'>Add to basket</button>
    </div>
  )
}

export default Product