import {buffer} from 'micro'
import * as admin from 'firebase-admin'

//secure connection to firebase from backend
const serviceAccount=require('../../permission.json')
//initialize app if not initialized ../.
const app=!admin.apps.length
? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
:admin.app()

//establish connection to stripe
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret=process.env.STRIPE_SIGNING_SECRET

const fullfillOrder=async(session)=>{
    console.log('fullfilling order ...')
    return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
        name:'cool',
        amount:session.amount_total/100,
        amount_shipping:session.total_details.amount_shipping/100,
        images:JSON.parse(session.metadata.images),
        timestamp:admin.firestore.FieldValue.serverTimestamp()
    })
    .then(()=>{
        console.log(`SUCCESS ORDER: ${session.id} has been added to the Db`)
    })
    .catch((error)=>{console.log('eroor accured while firebazzing ',error)})
}

export default async(req,res)=>{
    if(req.method==='POST'){
        const requestBuffer=await buffer(req)
        const payload=requestBuffer.toString()
        const sig=req.headers["stripe-signature"] //signature

        let event;
        //verify that event camefrom stripe
        try{
            event=stripe.webhooks.constructEvent(payload,sig,endpointSecret)
        }catch(err){
            console.log('EROOR ',err.message)
            return res.status(400).send('webhook error ',err.message)
        }

        //handle chech session completedevent
        if(event.type==='checkout.session.completed'){
            const session=event.data.object
            console.log('we dit it ...')
            //fullfill the order
            return fullfillOrder(session).then(()=>res.status(200))
            .catch((error)=>res.status(400).send(`Webhook eror ${error.message}`))
        }else{
            console.log('not that method ... sorry')
        }
    }
}

export const config={
    api:{
        bodyParser:false,
        externalResolver:true,
    }
}