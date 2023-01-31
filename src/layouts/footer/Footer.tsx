import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='bg-black w-full h-[100px] text-white font-bold font-sans flex flex-col justify-center items-center   '>
      <span className='uppercase '>Maded by 
        <Link className='hover:text-green-900' href='https://github.com/amedridvan' target="_blank" > ahmed</Link>
      </span>
      <span> 2023</span>
    </div>
  )
}

export default Footer