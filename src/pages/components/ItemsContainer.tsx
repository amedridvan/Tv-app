import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import SingleContent from "../../SingleContent";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import Genres from "./Genres";
import useGenre from "@/hooks/[gener]";

interface Props {
  items: Props1[];
  page :number ;
  pages:number ; 
  gener :[];
}
interface Props1 {
  id: string;
  poster: string;
  title: string;
  data: string;
  media_type: string;
  vote_average: string;
  pageno:string ;
  onclick :Function
}

const ItemsContainer = (props: Props) => {
  const { items } = props;
  const { push } = useRouter();


  const [content, setContent] = useState([]);

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [pageno, setPageno] = useState(1)
    const [paginationno, setPaginationno] = useState(0)
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

    
    const genreforURL = useGenre(selectedGenres)

    const GetDataTrending = async ()=>{
        
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=c76f21405a6fbe2e74354773617a04b8&page=${pageno}&with_genres=&language=en-US&with_genres=${genreforURL}`)
        setContent(data.results);
        setPaginationno(data.total_pages);
    }

    useEffect(()=>{
        console.log('Trending Component did mount');
        GetDataTrending();
        //eslint-disable-next-line
    }, [])

    useEffect(()=>{
        GetDataTrending();
        //eslint-disable-next-line
    }, [pageno, genreforURL])

    const handleClick = (number :any)=>{
        setPageno(number);
    }
    useEffect(()=>{
        console.log('Trending Component didupdate mount');
        GetDataTrending();
        //eslint-disable-next-line
    }, [pageno])
  function app(page:string) {
      push(`/ShowPage/${page}`);
    }
  function ShowDetiles (key:string,media:string){
    push(`/detiles/${media}/${key}`);
    
   }
   
  return (
    <>
      <h1 className="text-3xl text-center font-bold uppercase font-sans mb-4 hover:text-green-900 ">
        movie
      </h1>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPageno}
      />
      <div 
      className="flex flex-row flex-wrap justify-around "
      >
        {content?.map(function (item: any) {
          return ( 
            <SingleContent 
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              data={item.release_date || item.first_air_date}
              media_type="movie"
              vote_average={item.vote_average}
            />
          );
        })}
      </div>
      <Pagination
        onChange={(e:any ) =>app(e.target.textContent)}
        className="flex justify-center items-center bg-white "
        count={paginationno}
        color="secondary"
      />
    </>
  );
};

export default ItemsContainer;
