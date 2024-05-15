import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div
     className='p-3 '>
    <div className='   bg-black w-full h-[100px] text-white font-bold font-sans flex flex-col justify-center items-center p-3 
    rounded-md mt-[-15px]  '>
      <span className='uppercase '>Maded by 
        <Link  className='hover:text-green-600' href='https://github.com/amedridvan' target="_blank" > ahmed</Link>
      </span>
      <span> 2024</span>
    </div>
    </div>
  )
}

export default Footer