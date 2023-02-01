import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/layouts/Header/Header";
import useGenre from "@/hooks/[gener]";
import Footer from "../layouts/footer/Footer";
import ItemsContainer from "@/pages/components/ItemsContainer";

import { GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  items: [] ;
  page :number ;
  pages:number ;
  gener :[];
}
export default function Home(props: Props) {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const {items } = props
  const page=props.page
  const pages=props.pages
  const genreforURL = useGenre(selectedGenres);
  console.log('genreforURL :>> ', genreforURL);
  console.log('pages :>> ', pages);
  console.log('page', page)
  const gener=useGenre(selectedGenres);
  
  return (
    <>
      <Head>
        <title>Tv App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ItemsContainer items={items} page={page} pages={pages} gener={genreforURL}  />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: res  } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=c76f21405a6fbe2e74354773617a04b8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${1}
    `
  );

  //console.log("data :>>", res);
  return {
    props: {
      items: await res.results,
      page: await res.page ,
      pages :await res.total_pages
    },
  };
};
