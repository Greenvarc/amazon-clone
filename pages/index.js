'use client'
import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";


export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header/>
      <main className="max-w-screen-2xl mx-auto">
        {/* banner */}
        <Banner/>
        {/* product feed */}
        <ProductFeed products={products}/>
      </main>
    </div>
  );
}

//server side fetchings(props)
export async function getServerSideProps(context){
  //auth session ..
  const session=await getSession()
  const products=await fetch('https://fakestoreapi.com/products')
  .then((res)=>res.json())
  //console.log('producst: ',products)
  //then return valuesin props
  return {
    props:{
      products,session
  }
}
}
