import React from "react";
import FooterBanner from "../components/FooterBanner";
import HeroBanner from "../components/HeroBanner";
import Product from "../components/Product";
import { client } from "../lib/client";

function Home({ products, bannerData }) {
  console.log(bannerData)
  return (
    <>
      <HeroBanner heroBanner={bannerData[0]} />
      <div className="products-container">
      {products.map((product)=> <Product key={product._id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={bannerData[0]} />
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
