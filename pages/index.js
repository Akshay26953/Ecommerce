import React from "react";
import HeroBanner from "../components/HeroBanner";
import { client } from "../lib/client";

function Home({ products, bannerData }) {
  console.log(products)
  return (
    <>
      <HeroBanner heroBanner={bannerData} />
    </>
  );
}

export async function getServerSideProps() {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData }, // will be passed to the page component as props
  };
}

export default Home;
