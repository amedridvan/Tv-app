import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import SingleContent from "../../SingleContent";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { Changa_One } from "@next/font/google";
let page22 :string;

export const getStaticProps: GetServerSideProps = async (context) => {
  const {
    query: { pageno},
  } = context;
  console.log("pageno :>>", pageno);
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=c76f21405a6fbe2e74354773617a04b8&page=${pageno}`
  );

  //console.log("data :>>", data);
  return {
    props: {
      items: await data.results,
      page: await data.page,
    },
  };
};

interface Props {
  items: Props1[];
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
  // const [item, setitem] = useState([]);
  function app(page:string) {
    page22=page;
      push(`/ShowPage/${page}`);
    }
  function ShowDetiles (key:string){
    push(`/detiles/${key}`);
   }
  return (
    <>
      <h1 className="text-3xl text-center font-bold uppercase font-sans mb-4 hover:text-green-900 ">
        movie
      </h1>
      <div 
      className="flex flex-row flex-wrap justify-around "
      >
        {items?.map(function (item: any) {
          return ( 
            <SingleContent 
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              data={item.release_date || item.first_air_date}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          );
        })}
      </div>
      <Pagination
        onChange={(e) =>app(e.target.textContent)}
        className="flex justify-center items-center bg-white "
        count={1000}
        color="secondary"
      />
    </>
  );
};

export default ItemsContainer;
