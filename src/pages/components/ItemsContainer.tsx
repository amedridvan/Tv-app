import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import SingleContent from "../../SingleContent";

export const getStaticProps: GetServerSideProps = async (context) => {
  const {} = context;
  const { data: res } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=c76f21405a6fbe2e74354773617a04b8`
  );

  console.log("data :>>", res);
  return {
    props: {
      items: await res.results,
    },
  };
};




interface Props {
  items: Props1[];
}
interface Props1{
  id:string,
  poster:string,
  title:string,
  data:string,
  media_type:string,
  vote_average:string
}
const ItemsContainer = (props: Props) => {
  const { items } = props;
  // const [item, setitem] = useState([]);

  return (
    <> 
      <h1 className="text-3xl text-center font-bold uppercase font-sans mb-4 hover:text-green-900 ">movie</h1>
      <div className="flex flex-row flex-wrap justify-around ">
        {items?.map(function (item :any) {
          return <SingleContent 
          id={item.id}
          poster={item.poster_path}
          title={item.title || item.name }
          data={item.release_date  || item.first_air_date}
          media_type={item.media_type}
          vote_average={item.vote_average}
          />
        })}
      </div>
    </>
  );
};

export default ItemsContainer;
