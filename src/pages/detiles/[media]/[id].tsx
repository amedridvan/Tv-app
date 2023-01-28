import { GetServerSideProps } from "next";
import axios from "axios";
import React from 'react'
import {img_300 ,img_500 ,unavailable} from "../../../confing"
import { Button } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import AliceCarousel from "react-alice-carousel";
import { EffectCoverflow, Pagination, Swiper } from "swiper";

interface Props {
  items: []; 
  vidLink :string;
  casts: [];
}

const Detiles = ( props:Props) => {
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  const handleDragStart = (e) => e.preventDefault();
  const items = props.items
  const vidLink = props.vidLink
  const casts =props.casts

  console.log('casts', casts)


  console.log('vidLink', vidLink)
  const ImageURL2 =  items.backdrop_path ? img_500 + items.backdrop_path: unavailable;
  return (
    <>
   {items && ( <div style={{
     scrollbarWidth :"none"
   }} 
   className='bg-gray-600 flex flex-col justify-between h-[100%] w-[100%] overflow-y-scroll 
    '>
      {
            <>
            <img className='rounded-xl object-contain w-full h-full'
            alt="a"
            src={ImageURL2} />
            <div className='flex flex-col p-[10p] w-[95%] h-[90%] font-serif justify-evenly font-semibold   '>
              <span className='flex justify-center items-center h-[12%] text-xl pb-3 '>
                {items.name || items.title}
                (
                  {( items.first_air_date || items.release_date || "-----").substring(0,4)}
                )
              </span> 
              <i className='text-center pb-3'> {items.tagline}</i> 
              <span  style={{
                scrollbarWidth : "thin"
              }} className='flex h-[40%] overflow-y-scroll p-[15px] rounded-3xl shadow-black shadow-lg text-justify m-6 '>
                    {items.overview}
                  </span>
                  <div>
           
                  </div>
        <div>   
        <h2>Co-Star Informations</h2>
        
        {casts.map((item: any) => {
          return <div>
            < img src={`${img_500}${item.profile_path}`} alt="" />
          </div>
        } )}   
        </div> 
      
            <Button className='ml-8'
             variant="contained"
             startIcon={<YouTubeIcon />}
             color="secondary"
             target="__blank"
              href= {`https://www.youtube.com/watch?v=${vidLink}`}
              > watch video </Button>
              <Button className='ml-8 mt-4'
             variant="contained"
             startIcon={<YouTubeIcon />}
             color="primary"
             target="_self"
              href= "/"
              > Back to main </Button>
            </div>
             
            </>
      }
    </div>)}
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