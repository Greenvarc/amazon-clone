const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
export default async function handler(req,res){
    const {items,email}=req.body
    //trans items
    const transformedItem=items.map(item=>({
        

        price_data:{
            currency:'usd',
            product_data:{
                name:item.title,
                images:[item.image],
                description:item.description
            },
            unit_amount:item.price*100,
        },
        adjustable_quantity:{
            enabled:true,
            minimum:1,
        },
        quantity:1
        

    }))
    // console.log([...transformedItem])

    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        shipping_options:[{shipping_rate:'shr_1M5WrqCQgZQOUlVpq1zAwaA2'}],
        shipping_address_collection:{
            allowed_countries:['GB','US','CA']
        },
        line_items:[...transformedItem],
        mode:'payment',
        success_url:`${process.env.HOST}/success`,
        cancel_url:`${process.env.HOST}/checkout`,
        metadata:{
            email,
            images:JSON.stringify(items.map((item)=>item.image)),
        }
    })
    res.status(200).json({id:session.id})
}