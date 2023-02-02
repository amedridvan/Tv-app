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
import Header from "@/layouts/Header/Header";
import "keen-slider/keen-slider.min.css"

// Import Swiper styles

interface Props {
  items: {
    name:string ;
    backdrop_path :string ;
    title :string ;
    first_air_date :string;
    release_date :string; 
    tagline :string;
    overview :string ;
    profile_path :string ;
    id:number ;
  }; 
  vidLink :string;
  casts: [];
  pages:string
}


const Detiles = ( props:Props) => {
  const items = props.items
  const vidLink = props.vidLink
  const casts =props.casts
  const pages=props.pages
  const ImageURL2 =items.backdrop_path ? img_500 + items.backdrop_path: unavailable
  const animation = { duration: 20000, easing: (t: number) => t }
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 1000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )
  
  return ( 
      <> 
      <Header />
   <div  className="flex flex-col md:flex-row  p-[20px] bg-slate-900  ">
           <div className=' flex w-full md:flex-row flex-col'>
           <div className="md:w-[55%] flex justify-center items-center mb-2 "  >
            <Image className=' w-full h-full rounded-[5%]   '
            alt="a"
            src={ImageURL2}
            width={300}
            height={300} />
               </div> 
               
               <div className='bg-slate-600 w-full md:w-[40%]  flex flex-col justify-center items-center mb-10 rounded-[10px] 
                md:ml-10 h-full  '>
                  <span className="text-xl text-white hover:text-yellow-700 font-bold font-sans  md:text-4xl 
                  md:font-bold  ">
                    {items.name || items.title} (
                    {(
                      items.first_air_date ||
                      items.release_date ||  
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {items.tagline && (
                    <i  className="text-xs text-white hover:text-blue-900 font-bold font-sans  md:text-xl  md:font-bold ">{items.tagline}</i>
                  )}

                  <textarea rows="8" cols="50" 
                  className="h-[40%] md:h-[60%] w-full bg-gray-700 text-white font-bold text-xl md:text-2xl  rounded-[10px]
                  p-4 mt-5  overflow-hidden  md:font-bold ">
                    {items.overview}
                  </textarea>
                  </div>
            </div>
              
            </div>
              <h1 className=' text-center font-bold text-3xl font-sans uppercase my-3 hover:text-yellow-100 md:text-6xl '>actors</h1>
             <div ref={sliderRef} className="keen-slider">
          {casts.map((item, idx) => (
          
           <div key={item.id} id={item.id} className={`keen-slider__slide number-slide${idx}`}   >
            <div className='flex flex-col justify-center items-center p-3  '>
          <Image className=" rounded-[50%]  border-pink-600 border-solid border-b-0 border-l-0 border-[5px] 
          w-[150px] h-[150px] md:h-[350px] md:w-[300px] md:border-[10px] md:border-b-0 md:border-l-0 
           "
           src={item.profile_path ? `${img_300}/${item.profile_path}` : unavailable}
           height={200}
           width={150} 
           alt={item.id}/>
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


