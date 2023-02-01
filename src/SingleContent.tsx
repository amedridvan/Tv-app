import React from 'react'
import Image from 'next/image'
import {img_300 ,unavailable} from "./confing"
import { useRouter } from "next/router";
import Badge from '@mui/material/Badge';
interface props{
    id:string,
    poster:string,
    title:string,
    data:string,
    media_type:string,
    vote_average:number,
   
}

const SingleContent = (items:props) => {
  const { push } = useRouter();
  function ShowDetiles (key:string,media:string){
    push(`/detiles/${media}/${key}`);
   }
  const ImageURL =  items.poster ? img_300 + items.poster : unavailable;
  return (
    <>
    <div onClick={()=> ShowDetiles(items.id ,items.media_type)} key={items.id} className="flex flex-col w-[46%] md:w-[23%] p-1 mx-0 my-1 bg-slate-900  relative rounded-xl font-serif
    hover:bg-white hover:text-black  hover:cursor-pointer 
    ">
      < Badge badgeContent={ +items.vote_average} color={ +items.vote_average > 7 ? `primary`:`secondary`} />
      <Image className="rounded-[10px] "
      alt={items.title}
      src={ImageURL} 
      width={400}
      height={300}/>
     <b className="w-full text-center text-xl py-[8px] px-0 "> {items.title}</b>
     <span className="flex justify-between pb-[3px] pt-0  py-0 "> {items.media_type}
      <span>{items.data}</span>
      </span>
      </div>
    </>
  )
}

export default SingleContent