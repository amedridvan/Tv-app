import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/layouts/Header/Header";
import MainContainer from "@/pages/components/MainContainer";
import Footer from "../../layouts/footer/Footer";
import ItemsContainer from "@/pages/components/ItemsContainer";
import { BrowserRouter } from "react-router-dom";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";

interface Props {
  items: [];
}
const Detiles = ( props:Props) => {
  const {items} = props
  return (
    <div>
      {}
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const { data: res  } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=c76f21405a6fbe2e74354773617a04b8&page=${1}`
  );
  console.log(params
  //console.log("data :>>", res);

  return {
    props: {
      items: await res.results,
      pageno: await res.page 
    },
  };
};
export default Detiles