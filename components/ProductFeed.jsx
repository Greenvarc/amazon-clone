import React from 'react'
import Product from './Product'

function ProductFeed({products}) {
    //console.log(products)
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52'>
      {
        products.slice(0,4).map((product)=>(
            <Product 
            key={product.id}
            {...product}
            />
        ))
      }
      <img
      className='md:col-span-full'
       src="https://links.papareact.com/dyz" alt="ads" />

        <div className='md:col-span-2'>
        {
            products.slice(4,5).map((product)=>(
                <Product 
                key={product.id}
                {...product}
                />
            ))
        }
        </div>
        {
        products.slice(5).map((product)=>(
            <Product 
            key={product.id}
            {...product}
            />
        ))
      }
    </div>
  )
}

export default ProductFeed
