import { GetServerSideProps } from "next";
import axios from "axios";
import React from 'react'
import {img_500 ,unavailable} from "../../../confing"
import { Button } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';

interface Props {
  items: [];
}
interface Props1{
  vid:[];
}
const Detiles = ( props:Props,props1:Props1) => {
  const {items} = props
  const {vid} = props1
  const ImageURL =  items.poster_path ? img_500 + items.poster_path: unavailable;
  const ImageURL2 =  items.backdrop_path ? img_500 + items.backdrop_path: unavailable;
  console.log(items)
  return (
    
    <>
   { items &&( <div style={{
     scrollbarWidth :"none"
   }} 
   className='bg-gray-600 w-full
    '>
      {
            <><img className='rounded-xl object-contain w-full h-full'
            alt="a"
            src={ImageURL2} />
            <div className='flex flex-col justify-between h-full w-full  '>
              <span className='text-center'>
                {items.name || items.title}
                (
                  {( items.first_air_date || items.release_date || "-----").substring(0,4)}
                )
              </span> 
              <i className='text-center pb-3'> {items.tagline}</i> 
              <span className=''>
                    {items.overview}
                  </span>
              <Button variant="text"
              startIcon={<YouTubeIcon />}
              target="_blank"
              href= {`https://www.youtube.com/watch?v${vid}`}
              > ahmed</Button>
            </div>
            </>
      }
    </div> )}
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
 
  console.log('res', res)
  //console.log("data :>>", res);

  return {
  
    props: {
      items: await res ,
      vidLinl :await res1.results[0]
    },
  };
};

export default Detiles