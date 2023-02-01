import { GetServerSideProps } from "next";
import axios from "axios";
import React from 'react'
import {img_300  ,img_500 ,unavailable} from "../../../confing"
import { Button } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import CottageIcon from '@mui/icons-material/Cottage';
import Image from "next/image"; 
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "../../../styles/Home.module.css" 
import Footer from "../../../layouts/footer/Footer"

// Import Swiper styles

interface Props {
  items: []; 
  vidLink :string;
  casts: [];
  pages:string
}

const Detiles = ( props:Props) => {
  const handleDragStart = (e :any) => e.preventDefault()
  const items = props.items
  const vidLink = props.vidLink
  const casts =props.casts
  const pages=props.pages
  
  const animation = { duration: 10000, easing: (t: number) => t }
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })
  const ImageURL2 =  items.backdrop_path ? img_500 + items.backdrop_path: unavailable
  return ( 
      <> 
   <div  className="flex flex-col md:flex-row  justify-between p-[20px] bg-slate-900  ">
           <div className='w-full flex flex-row'>
           <div className="md:w-[40%] flex justify-center items-center mb-2  "  >
            <Image className=' w-full h-full rounded-[5%]  '
            alt="a"
            src={ImageURL2}
            width={300}
            height={400} />
               </div> 
               
               <div className='bg-slate-600 w-full  flex flex-col justify-center items-center mb-10 rounded-[10px] 
                  '>
                  <span className="text-xl text-white hover:text-yellow-700 font-bold font-sans  md:text-4xl  ">
                    {items.name || items.title} (
                    {(
                      items.first_air_date ||
                      items.release_date ||  
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {items.tagline && (
                    <i  className="text-xs text-white hover:text-blue-900 font-bold font-sans  md:text-xl">{items.tagline}</i>
                  )}

                  <textarea rows="8" cols="50" 
                  className="h-[40%] w-full bg-gray-700 text-white font-bold text-xl md:text-2xl  rounded-[10px]
                  p-4 mt-5  overflow-hidden ">
                    {items.overview}
                  </textarea>
                  </div>
            </div>

            </div>
             <div ref={sliderRef} className="keen-slider">
          {casts.map((item, idx) => (
          
           <div key={item.id} id={item.id} className={`keen-slider__slide number-slide${idx}`}   >
            <div className='flex flex-col justify-center items-center '>
          <img className=" rounded-[50%]   border-pink-600 border-solid border-b-0 border-l-0 border-[10px]  " 
           src={item.profile_path ? `${img_300}/${item.profile_path}` : unavailable} />
           <b className="text-2xl font-sans font-bold  ">{item?.name}</b>
           </div>
           </div>
            ))}
           </div>
              
              <div className='mt-8   md:h-[12%] w-full flex justify-center items-center'>
              <Button className=' w-full mb-3 ' 
                variant="contained"
                startIcon={<YouTubeIcon />}
                color="secondary"
                target="__blank"
                href={`https://www.youtube.com/watch?v=${vidLink}`}
              > watch video </Button>
              </div> 
      <Button className='w-full mt-2 mb-2 flex justify-center items-center  '
                variant="contained"
                startIcon={<CottageIcon />}
                color="primary"
                target="_self"
                href="/"
              > Back to home </Button>
              <Footer />
      
    </>
    
  )
}



export const getServerSideProps: GetServerSideProps = async ({params}) => {

const { data: res  } = await axios.get(
    `https://api.themoviedb.org/3/${params.media}/${params.id}?api_key=c76f21405a6fbe2e74354773617a04b8&language=en-US`
  );
  const { data: res1  } = await axios.get(
    `https://api.themoviedb.org/3/${params.media}/${params.id}/videos?api_key=c76f21405a6fbe2e74354773617a04b8&language=en-US`
  );
  const { data: res2  } = await axios.get(
    `https://api.themoviedb.org/3/${params.media}/${params.id}/credits?api_key=c76f21405a6fbe2e74354773617a04b8&language=en-US`
  );
  console.log("data :>>", await res1.results[0]?.key);

  console.log('res2.cast >>', res2.cast)

  return {
  
    props: {
      items: await res ,
      vidLink :await res1.results[0]?.key,
      casts: await res2.cast 
    },
  };
};

export default Detiles


