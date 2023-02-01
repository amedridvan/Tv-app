import Home from '@/pages'
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'


const Header = () => {
  const router=useRouter;
  return (
    <>
    <div>
     <h1 onClick={ ()=> window.scroll(0,0)} className="w-full h-100px bg-gray-600 text-white text-center mb-[10px] uppercase font-bold text-4xl
       hover:text-green-400 hover:cursor-pointer  z-10 flex justify-center items-center p-3 "
     >🎬 tv app  🎥</h1>
     </div>
    </>
  )
}

export default Header 