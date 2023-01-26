import Home from '@/pages'
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'


const Header = () => {
  const router=useRouter;
  return (
    <>
    <div>
     <h1 onClick={ ()=> window.scroll(0,0)} className="w-full h-10px bg-orange-500 text-center mb-[10px] uppercase font-bold text-4xl  hover:text-black  z-10">tv app for teaching</h1>
     </div>
    </>
  )
}

export default Header 